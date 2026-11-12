import { describe, expect, it } from "vitest";

import vercelConfigRaw from "../../vercel.json?raw";

/**
 * Guards the Vercel edge caching contract for build assets.
 *
 * The `headers` block is where a one-year `immutable` policy lives. Vercel
 * applies header rules by request path only — it cannot know whether the file
 * exists — so a pattern matching every `/assets/*` request also stamps
 * `immutable` onto 404 responses, which browsers and CDNs may then cache for a
 * year. The rule must therefore match fingerprint-shaped filenames only.
 */

const config = JSON.parse(vercelConfigRaw) as {
  cleanUrls?: boolean;
  trailingSlash?: boolean;
  redirects?: Array<{ source: string; destination: string; permanent?: boolean; has?: unknown[] }>;
  headers?: Array<{ source: string; headers: Array<{ key: string; value: string }> }>;
};

/**
 * Minimal translation of a vercel.json `source` into a matcher. Only the
 * `:name(regex)` form used by this project is handled; nested groups are kept
 * verbatim so the RegExp engine evaluates the same expression Vercel compiles
 * into the deployment's routing config.
 */
function sourceToRegExp(source: string): RegExp {
  const withParams = source.replace(
    /:([A-Za-z0-9_]+)\(((?:[^()]|\([^()]*\))*)\)/g,
    (_match, _name: string, inner: string) => `(${inner})`,
  );
  return new RegExp(`^${withParams}$`);
}

const headerRules = config.headers ?? [];
const cacheRules = headerRules.filter((rule) =>
  rule.headers.some((header) => header.key.toLowerCase() === "cache-control"),
);

const immutableRule = cacheRules[0];
const immutablePattern = immutableRule ? sourceToRegExp(immutableRule.source) : null;

const securityRule = headerRules.find((rule) =>
  rule.headers.some((header) => header.key === "X-Frame-Options"),
);

const assetModules = import.meta.glob("../../dist/assets/*", {
  eager: true,
  query: "?url",
  import: "default",
});

describe("vercel.json asset caching", () => {
  it("declares exactly one Cache-Control rule", () => {
    expect(cacheRules).toHaveLength(1);
    expect(immutableRule?.headers).toEqual([
      { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
    ]);
  });

  it("does not apply immutable caching to every /assets path", () => {
    expect(immutableRule?.source).not.toBe("/assets/(.*)");
    expect(immutableRule?.source).toContain("-[A-Za-z0-9_-]{8}");
  });

  it("keeps cleanUrls and trailing-slash normalisation enabled", () => {
    expect(config.cleanUrls).toBe(true);
    expect(config.trailingSlash).toBe(false);
  });

  it("matches fingerprinted build assets", () => {
    const fingerprinted = [
      "/assets/index-Dm2CZpBo.js",
      "/assets/About-BgUuUas7.js",
      "/assets/index-BX0Y1234.css",
      "/assets/boksi-CWJ-6CzR.jpeg",
      "/assets/robot_blink_full-DrqiE-8l.gif",
      "/assets/BYTHERIXlogo-HCFZetdH.png",
      "/assets/inter-latin-400-normal-DdS6r0nq.woff2",
    ];

    for (const path of fingerprinted) {
      expect(immutablePattern?.test(path), path).toBe(true);
    }
  });

  it("never matches missing or unhashed asset requests", () => {
    const notFingerprinted = [
      "/assets/does-not-exist.js",
      "/assets/logo-missing.png",
      "/assets/missing-asset.js",
      "/assets/broken-image.png",
      "/assets/hero.png",
      "/assets/foo/bar-abcdefgh.js",
      "/assets/",
    ];

    for (const path of notFingerprinted) {
      expect(immutablePattern?.test(path), path).toBe(false);
    }
  });

  it("leaves HTML routes and public files outside the immutable rule", () => {
    const pagePaths = [
      "/",
      "/products/pam",
      "/about-company",
      "/does-not-exist-zzz",
      "/og-image.png",
      "/sitemap.xml",
      "/robots.txt",
    ];

    for (const path of pagePaths) {
      expect(immutablePattern?.test(path), path).toBe(false);
    }
  });

  it("keeps the existing security headers unchanged", () => {
    expect(securityRule?.source).toBe("/(.*)");
    expect(securityRule?.headers).toEqual([
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "X-Frame-Options", value: "DENY" },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(), payment=()",
      },
      { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
      {
        key: "Content-Security-Policy-Report-Only",
        value:
          "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob:; media-src 'self'; connect-src 'self' https:; frame-ancestors 'none'; base-uri 'self'; form-action 'self'",
      },
    ]);
  });

  it("keeps the www-to-apex redirect unchanged", () => {
    expect(config.redirects).toEqual([
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.bytherixtechnology.com" }],
        destination: "https://bytherixtechnology.com/:path*",
        permanent: true,
      },
    ]);
  });

  it("keeps every real build asset eligible for immutable caching", () => {
    const paths = Object.keys(assetModules);
    if (paths.length === 0) return;

    for (const path of paths) {
      const file = path.slice(path.lastIndexOf("/") + 1);
      expect(immutablePattern?.test(`/assets/${file}`), file).toBe(true);
    }
  });
});
