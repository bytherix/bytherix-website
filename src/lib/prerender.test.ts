import { describe, expect, it } from "vitest";

import { SITE_URL } from "./seo";
import {
  buildNotFoundHtml,
  buildSitemap,
  getPrerenderRoutes,
  getSitemapRoutes,
  htmlFileFor,
  injectSeoHead,
  renderSeoHead,
  SEO_END_MARKER,
  SEO_START_MARKER,
} from "./prerender";

const template = `<!doctype html><html><head>
    ${SEO_START_MARKER}
    <title>Template</title>
    ${SEO_END_MARKER}
    <link rel="preconnect" href="https://fonts.googleapis.com" />
  </head><body><div id="root"></div></body></html>`;

const routes = getPrerenderRoutes();
const indexable = routes.filter((route) => route.indexable);

describe("getPrerenderRoutes", () => {
  it("covers every static, team and blog route exactly once", () => {
    const paths = routes.map((route) => route.path);

    expect(new Set(paths).size).toBe(paths.length);
    expect(paths).toEqual(
      expect.arrayContaining([
        "/",
        "/about-company",
        "/our-team",
        "/shop",
        "/products",
        "/products/our-founder",
        "/products/one-for-all",
        "/products/pam",
        "/portfolios",
        "/our-story",
        "/blogs",
        "/blogs/why-nepal-needs-ai-ml-model",
        "/team/anish-parajuli",
        "/privacy-policy",
        "/terms-of-use",
        "/sales-and-refunds",
        "/login",
        "/register",
      ]),
    );
    expect(indexable.length).toBe(17);
  });

  it("gives every indexable route a unique self-referencing canonical", () => {
    const canonicals = indexable.map((route) => route.canonical);

    expect(new Set(canonicals).size).toBe(canonicals.length);
    for (const route of indexable) {
      expect(route.canonical).toBe(
        route.path === "/" ? `${SITE_URL}/` : `${SITE_URL}${route.path}`,
      );
    }
  });

  it("gives every indexable route a unique title and description", () => {
    const titles = indexable.map((route) => route.meta.title);
    const descriptions = indexable.map((route) => route.meta.description);

    expect(new Set(titles).size).toBe(titles.length);
    expect(new Set(descriptions).size).toBe(descriptions.length);
    for (const route of indexable) {
      expect(route.meta.title.length).toBeGreaterThan(15);
      expect(route.meta.description.length).toBeGreaterThan(40);
      expect(route.meta.description.length).toBeLessThanOrEqual(160);
    }
  });

  it("keeps legal and account routes non-indexable", () => {
    for (const path of ["/privacy-policy", "/terms-of-use", "/sales-and-refunds"]) {
      expect(routes.find((route) => route.path === path)?.meta.robots).toBe("noindex, follow");
    }
    for (const path of ["/login", "/register"]) {
      expect(routes.find((route) => route.path === path)?.meta.robots).toBe("noindex, nofollow");
    }
  });

  it("marks every document indexable or noindexed via a robots directive", () => {
    for (const route of routes) {
      expect(route.meta.robots === undefined || /noindex/.test(route.meta.robots)).toBe(true);
    }
  });
});

describe("structured data", () => {
  it("emits Organization and WebSite only on the homepage", () => {
    const home = routes.find((route) => route.path === "/");
    const types = home?.structuredData.map((node) => node["@type"]);

    expect(types).toEqual(["Organization", "WebSite"]);

    for (const route of routes.filter((entry) => entry.path !== "/")) {
      const json = JSON.stringify(route.structuredData);
      expect(json).not.toContain('"Organization"');
    }
  });

  it("describes blog articles with BlogPosting and a breadcrumb trail", () => {
    const blog = routes.find((route) => route.path === "/blogs/nepal-cybersecurity-level");
    const types = blog?.structuredData.map((node) => node["@type"]);

    expect(types).toEqual(["BlogPosting", "BreadcrumbList"]);
    expect(blog?.structuredData[0].url).toBe(`${SITE_URL}/blogs/nepal-cybersecurity-level`);
    expect(blog?.structuredData[0].datePublished).toBeUndefined();
  });

  it("describes team members with Person and a breadcrumb trail", () => {
    const member = routes.find((route) => route.path === "/team/anish-parajuli");
    const types = member?.structuredData.map((node) => node["@type"]);

    expect(types).toEqual(["Person", "BreadcrumbList"]);
    expect(member?.structuredData[0].name).toBe("Anish Parajuli");
  });

  it("keeps breadcrumb positions sequential and rooted at home", () => {
    const blog = routes.find((route) => route.path === "/blogs/nepal-cybersecurity-level");
    const breadcrumb = blog?.structuredData[1] as {
      itemListElement: { position: number; item: string }[];
    };

    expect(breadcrumb.itemListElement.map((item) => item.position)).toEqual([1, 2, 3]);
    expect(breadcrumb.itemListElement[0].item).toBe(`${SITE_URL}/`);
  });
});

describe("renderSeoHead", () => {
  it("emits exactly one canonical, robots, title and description per route", () => {
    for (const route of routes) {
      const head = renderSeoHead(route);

      expect(head.match(/rel="canonical"/g)?.length ?? 0).toBe(1);
      expect(head.match(/name="robots"/g)?.length).toBe(1);
      expect(head.match(/<title>/g)?.length).toBe(1);
      expect(head.match(/name="description"/g)?.length).toBe(1);
      expect(head).toContain(`href="${route.canonical}"`);
    }
  });

  it("uses the 1200x630 social image instead of the square logo", () => {
    const head = renderSeoHead(routes[0]);

    expect(head).toContain(`content="${SITE_URL}/og-image.png"`);
    expect(head).toContain('property="og:image:width" content="1200"');
    expect(head).toContain('property="og:image:height" content="630"');
    expect(head).not.toContain(`property="og:image" content="${SITE_URL}/logo.png"`);
  });

  it("cannot be broken out of by content containing a script tag", () => {
    const head = renderSeoHead({
      ...routes[0],
      structuredData: [{ "@type": "Thing", name: "</script><script>alert(1)</script>" }],
    });

    expect(head).not.toContain("</script><script>alert(1)");
    expect(head).toContain("\\u003c/script");
  });
});

describe("injectSeoHead", () => {
  it("replaces the marked block and preserves the rest of the document", () => {
    const html = injectSeoHead(template, renderSeoHead(routes[0]));

    expect(html).not.toContain("<title>Template</title>");
    expect(html).toContain(`href="${SITE_URL}/"`);
    expect(html).toContain('rel="preconnect"');
    expect(html).toContain('<div id="root"></div>');
  });

  it("throws when the template markers are missing", () => {
    expect(() => injectSeoHead("<!doctype html><html></html>", "x")).toThrow(/markers/);
  });
});

describe("buildNotFoundHtml", () => {
  it("produces a noindex document without a canonical", () => {
    const html = buildNotFoundHtml(template);

    expect(html).toContain("Page Not Found | Bytherix Technology");
    expect(html).toContain('content="noindex, follow"');
    expect(html).not.toContain('rel="canonical"');
    expect(html).not.toContain('property="og:url"');
    expect(html).not.toContain("application/ld+json");
  });
});

describe("sitemap", () => {
  it("lists exactly the indexable routes and nothing else", () => {
    const xml = buildSitemap();
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

    expect(locs).toHaveLength(17);
    expect(new Set(locs).size).toBe(17);
    expect(locs).toEqual(expect.arrayContaining(indexable.map((route) => route.canonical)));
    expect(xml).not.toContain("lastmod");
    expect(getSitemapRoutes()).toHaveLength(17);
  });
});

describe("htmlFileFor", () => {
  it("maps the homepage to index.html and every other route to a clean-URL file", () => {
    expect(htmlFileFor("/")).toBe("index.html");
    expect(htmlFileFor("/about-company")).toBe("about-company.html");
    expect(htmlFileFor("/blogs/nepal-cybersecurity-level")).toBe(
      "blogs/nepal-cybersecurity-level.html",
    );
  });
});
