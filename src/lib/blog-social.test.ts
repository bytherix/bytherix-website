import { describe, expect, it } from "vitest";
import { BLOG_POSTS } from "../components/pages/blogs/data/blog.constants";
import { BLOG_SOCIAL_IMAGES } from "../components/pages/blogs/data/blog.social";
import { buildSitemap, getPrerenderRoutes, renderSeoHead } from "./prerender";
import { DEFAULT_SOCIAL_IMAGE, SITE_URL, socialImageFor } from "./seo";
import blogCardSource from "../components/pages/blogs/ui/BlogCard.tsx?raw";
import teamCardSource from "../components/pages/team/ui/TeamCard.tsx?raw";
import blogSocialSource from "../components/pages/blogs/data/blog.social.ts?raw";
import seoSource from "./seo.ts?raw";

const metaTag = (attribute: "property" | "name", key: string, value: string) =>
  `<meta ${attribute}="${key}" content="${value}" />`;

const fingerprint = (post: { slug: string; title: string; image: string }) =>
  [post.slug, post.title, post.image].join("|");

describe("blog social image table", () => {
  it("covers exactly the published articles, in the same order", () => {
    expect(BLOG_SOCIAL_IMAGES.map(fingerprint)).toEqual(BLOG_POSTS.map(fingerprint));
    expect(new Set(BLOG_SOCIAL_IMAGES.map((entry) => entry.slug)).size).toBe(
      BLOG_SOCIAL_IMAGES.length,
    );
  });

  it("declares an intrinsic landscape size for real artwork", () => {
    for (const entry of BLOG_SOCIAL_IMAGES) {
      expect(entry.image.startsWith("/blog/")).toBe(true);
      expect(entry.image.endsWith(".jpeg")).toBe(true);
      expect(Number.isInteger(entry.width)).toBe(true);
      expect(Number.isInteger(entry.height)).toBe(true);
      expect(entry.width).toBeGreaterThan(entry.height);
      expect(entry.width).toBeGreaterThanOrEqual(1200);
      expect(entry.height).toBeGreaterThanOrEqual(630);
    }
  });
});

describe("per-route social metadata", () => {
  const blogRoutes = getPrerenderRoutes().filter((route) => route.path.startsWith("/blogs/"));

  it("advertises each article's own artwork and verified dimensions", () => {
    expect(blogRoutes).toHaveLength(BLOG_SOCIAL_IMAGES.length);

    for (const route of blogRoutes) {
      const entry = BLOG_SOCIAL_IMAGES.find((item) => `/blogs/${item.slug}` === route.path);
      expect(entry, `missing social entry for ${route.path}`).toBeDefined();
      if (!entry) continue;

      const head = renderSeoHead(route);
      const imageUrl = `${SITE_URL}${entry.image}`;

      expect(head).toContain(metaTag("property", "og:image", imageUrl));
      expect(head).toContain(metaTag("property", "og:image:width", String(entry.width)));
      expect(head).toContain(metaTag("property", "og:image:height", String(entry.height)));
      expect(head).toContain(metaTag("property", "og:image:alt", entry.title));
      expect(head).toContain(metaTag("name", "twitter:image", imageUrl));
      expect(head).toContain(metaTag("name", "twitter:image:alt", entry.title));
      expect(head).toContain(metaTag("property", "og:type", "article"));
      expect(head).not.toContain(`${SITE_URL}${DEFAULT_SOCIAL_IMAGE.path}"`);
    }
  });

  it("keeps the brand card on every non-article route", () => {
    const routes = getPrerenderRoutes().filter((route) => !route.path.startsWith("/blogs/"));

    for (const route of routes) {
      const head = renderSeoHead(route);

      expect(head).toContain(
        metaTag("property", "og:image", `${SITE_URL}${DEFAULT_SOCIAL_IMAGE.path}`),
      );
      expect(head).toContain(metaTag("property", "og:image:width", String(DEFAULT_SOCIAL_IMAGE.width)));
      expect(head).toContain(
        metaTag("property", "og:image:height", String(DEFAULT_SOCIAL_IMAGE.height)),
      );
    }
  });

  it("falls back to the brand card for unknown or trailing-slash article paths", () => {
    expect(socialImageFor("/blogs/not-a-post")).toEqual(DEFAULT_SOCIAL_IMAGE);
    expect(socialImageFor("/blogs/nepal-cybersecurity-level/")).toEqual({
      path: "/blog/cybersecurity.jpeg",
      width: 1536,
      height: 1024,
      alt: "Nepal's Cybersecurity Level in the World",
    });
  });
});

describe("shared SEO runtime", () => {
  it("imports the metadata table, never the article bodies", () => {
    // `seo.ts` is reachable from the client bundle (via RouteMeta), so it must
    // not reference blog.constants. `prerender.ts` is build-time/test-only and
    // may still read the full article list.
    expect(seoSource).not.toMatch(/from\s+["'][^"']*blog\.constants/);
    expect(seoSource).toContain("blog.social");
    expect(blogSocialSource).not.toMatch(/from\s+["'][^"']*blog\.constants/);
  });
});

describe("blog card", () => {
  it("exposes exactly one article link and no programmatic navigation", () => {
    expect((blogCardSource.match(/<Link/g) ?? []).length).toBe(1);
    expect(blogCardSource).not.toContain("useNavigate");
    expect(blogCardSource).not.toContain("onClick");
    expect(blogCardSource).toContain("after:absolute");
    expect(blogCardSource).toContain("focus-within:ring-2");
  });
});

describe("team card", () => {
  it("is a non-interactive container with a single full-card link", () => {
    expect((teamCardSource.match(/<Link/g) ?? []).length).toBe(1);
    expect(teamCardSource).not.toContain('role="link"');
    expect(teamCardSource).not.toContain("tabIndex");
    expect(teamCardSource).not.toContain("onClick");
    expect(teamCardSource).not.toContain("onKeyDown");
    expect(teamCardSource).not.toContain("useNavigate");
    expect(teamCardSource).toContain("focus-within:ring-2");
    expect(teamCardSource).toContain("group-focus-within:opacity-100");
  });
});

describe("sitemap", () => {
  const xml = buildSitemap();
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

  it("is well-formed and lists every indexable route exactly once", () => {
    expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true);
    expect(xml.trimEnd().endsWith("</urlset>")).toBe(true);
    expect(locs).toHaveLength(17);
    expect(new Set(locs).size).toBe(locs.length);
    expect(new Set(locs)).toEqual(
      new Set(
        getPrerenderRoutes()
          .filter((route) => route.indexable)
          .map((route) => route.canonical),
      ),
    );
  });

  it("uses the canonical HTTPS host and excludes non-indexable routes", () => {
    for (const loc of locs) {
      const url = new URL(loc);
      expect(url.protocol).toBe("https:");
      expect(url.host).toBe("bytherixtechnology.com");
    }

    for (const excluded of [
      "/login",
      "/register",
      "/privacy-policy",
      "/terms-of-use",
      "/sales-and-refunds",
      "/404",
    ]) {
      expect(locs).not.toContain(`${SITE_URL}${excluded}`);
    }
  });
});
