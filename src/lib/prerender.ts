import { BLOG_POSTS } from "../components/pages/blogs/data/blog.constants.ts";
import { teamMembers } from "../components/pages/team/data/team.ts";
import {
  canonicalFor,
  clampDescription,
  NOT_FOUND_META,
  resolveMeta,
  SITE_NAME,
  SITE_URL,
  type PageMeta,
} from "./seo.ts";

/**
 * Build-time SEO prerendering.
 *
 * The application is a client-rendered SPA: every URL is served the same
 * `index.html`. Search engines that read the initial HTML response would
 * therefore see the homepage title, description and canonical on every route.
 *
 * This module produces the per-route `<head>` that is injected into the
 * generated HTML at build time (see the `bytherix-seo-prerender` plugin in
 * `vite.config.ts`). It is imported by the build configuration and by tests
 * only - never by the browser bundle.
 */

export const OG_IMAGE_PATH = "/og-image.png";
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;
export const OG_IMAGE_ALT = "Bytherix Technology logo";

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export interface PrerenderRoute {
  path: string;
  meta: PageMeta;
  canonical: string;
  /** Indexable pages are listed in sitemap.xml; the rest carry noindex. */
  indexable: boolean;
  breadcrumbs?: BreadcrumbItem[];
  structuredData: Record<string, unknown>[];
}

/** Static routes that are publicly indexable. */
const INDEXABLE_STATIC_PATHS = [
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
] as const;

/** Routes rendered for completeness but deliberately excluded from search. */
const NOINDEX_STATIC_PATHS = [
  "/privacy-policy",
  "/sales-and-refunds",
  "/terms-of-use",
  "/login",
  "/register",
] as const;

const BREADCRUMB_LABELS: Record<string, string> = {
  "/": "Home",
  "/about-company": "About Company",
  "/our-team": "Our Team",
  "/shop": "Courses & Products",
  "/products": "Products",
  "/products/our-founder": "Our Founder",
  "/products/one-for-all": "One For All",
  "/products/pam": "PAM",
  "/portfolios": "Portfolio",
  "/our-story": "Our Story",
  "/blogs": "Blogs",
  "/privacy-policy": "Privacy Policy",
  "/sales-and-refunds": "Sales & Refunds",
  "/terms-of-use": "Terms of Use",
  "/login": "Login",
  "/register": "Register",
};

const ORGANIZATION = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/logo.png`,
  description:
    "Kathmandu-based software company providing web, mobile, AI/ML, cloud, cybersecurity and design services.",
  email: "bytherix1@gmail.com",
  telephone: "+977-9861165413",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kathmandu",
    addressCountry: "NP",
  },
  sameAs: [
    "https://www.youtube.com/@Bytherix_Technology",
    "https://www.facebook.com/profile.php?id=61591150259850",
    "https://www.instagram.com/bytherix_/",
    "https://www.tiktok.com/@bytherixtechnology",
  ],
};

const organizationNode = () => ({ "@context": "https://schema.org", ...ORGANIZATION });

const websiteNode = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  inLanguage: "en",
  publisher: { "@id": `${SITE_URL}/#organization` },
});

const breadcrumbNode = (items: BreadcrumbItem[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: canonicalFor(item.path),
  })),
});

const breadcrumbsFor = (path: string): BreadcrumbItem[] => {
  if (path === "/") return [];

  const segments = path.split("/").filter(Boolean);
  const items: BreadcrumbItem[] = [{ name: "Home", path: "/" }];

  let current = "";
  segments.forEach((segment) => {
    current += `/${segment}`;
    items.push({ name: BREADCRUMB_LABELS[current] ?? humanize(segment), path: current });
  });

  return items;
};

function humanize(segment: string): string {
  return segment
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function structuredDataFor(path: string): Record<string, unknown>[] {
  const nodes: Record<string, unknown>[] = [];

  if (path === "/") {
    nodes.push(organizationNode(), websiteNode());
    return nodes;
  }

  if (path.startsWith("/blogs/")) {
    const post = BLOG_POSTS.find((entry) => `/blogs/${entry.slug}` === path);
    if (post) {
      nodes.push({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description,
        image: `${SITE_URL}${post.image}`,
        url: canonicalFor(path),
        mainEntityOfPage: canonicalFor(path),
        inLanguage: "en",
        author: { "@id": `${SITE_URL}/#organization` },
        publisher: { "@id": `${SITE_URL}/#organization` },
      });
    }
  }

  if (path.startsWith("/team/")) {
    const member = teamMembers.find((entry) => `/team/${entry.slug}` === path);
    if (member) {
      nodes.push({
        "@context": "https://schema.org",
        "@type": "Person",
        name: member.name,
        jobTitle: member.role,
        url: canonicalFor(path),
        image: `${SITE_URL}${member.image}`,
        worksFor: { "@id": `${SITE_URL}/#organization` },
        ...(member.linkedin ? { sameAs: [member.linkedin] } : {}),
      });
    }
  }

  const breadcrumbs = breadcrumbsFor(path);
  if (breadcrumbs.length > 0) nodes.push(breadcrumbNode(breadcrumbs));

  return nodes;
}

function route(path: string, indexable: boolean, metaOverride?: PageMeta): PrerenderRoute {
  const meta = metaOverride ?? resolveMeta(path);
  const breadcrumbs = breadcrumbsFor(path);

  return {
    path,
    meta,
    canonical: canonicalFor(path),
    indexable,
    breadcrumbs,
    structuredData: structuredDataFor(path),
  };
}

/** Every HTML document the build must emit, in a stable order. */
export function getPrerenderRoutes(): PrerenderRoute[] {
  const staticRoutes = [
    ...INDEXABLE_STATIC_PATHS.map((path) => route(path, true)),
    ...NOINDEX_STATIC_PATHS.map((path) => route(path, false)),
  ];

  const teamRoutes = teamMembers.map((member) =>
    route(`/team/${member.slug}`, true, {
      title: `${member.name} | Bytherix Technology Team`,
      description: clampDescription(
        `${member.name} is ${member.role} at Bytherix Technology, a software company based in Kathmandu, Nepal.`,
      ),
    }),
  );

  const blogRoutes = BLOG_POSTS.map((post) =>
    route(`/blogs/${post.slug}`, true, {
      title: `${post.title} | Bytherix Technology Blog`,
      description: clampDescription(post.description),
    }),
  );

  return [...staticRoutes, ...teamRoutes, ...blogRoutes];
}

export function getSitemapRoutes(routes: PrerenderRoute[] = getPrerenderRoutes()): PrerenderRoute[] {
  return routes.filter((entry) => entry.indexable);
}

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** JSON inside `<script>` must not be able to close the tag early. */
const escapeJson = (value: unknown): string =>
  JSON.stringify(value).replace(/</g, "\\u003c");

const ogTypeFor = (path: string): string => (path.startsWith("/blogs/") ? "article" : "website");

/**
 * Builds the `<head>` fragment for one route: title, description, robots,
 * canonical, Open Graph, Twitter card and JSON-LD.
 */
export function renderSeoHead(entry: PrerenderRoute): string {
  const title = escapeHtml(entry.meta.title);
  const description = escapeHtml(entry.meta.description);
  const robots = escapeHtml(entry.meta.robots ?? "index, follow");
  const canonical = escapeHtml(entry.canonical);

  const lines = [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<meta name="robots" content="${robots}" />`,
  ];

  if (entry.canonical) {
    lines.push(`<link rel="canonical" href="${canonical}" />`);
  }

  lines.push(
    "",
    `<meta property="og:type" content="${ogTypeFor(entry.path)}" />`,
    `<meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
  );

  if (entry.canonical) {
    lines.push(`<meta property="og:url" content="${canonical}" />`);
  }

  lines.push(
    `<meta property="og:image" content="${SITE_URL}${OG_IMAGE_PATH}" />`,
    `<meta property="og:image:width" content="${OG_IMAGE_WIDTH}" />`,
    `<meta property="og:image:height" content="${OG_IMAGE_HEIGHT}" />`,
    `<meta property="og:image:alt" content="${escapeHtml(OG_IMAGE_ALT)}" />`,
    `<meta property="og:locale" content="en_US" />`,
    "",
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${SITE_URL}${OG_IMAGE_PATH}" />`,
    `<meta name="twitter:image:alt" content="${escapeHtml(OG_IMAGE_ALT)}" />`,
  );

  for (const node of entry.structuredData) {
    lines.push(`<script type="application/ld+json">${escapeJson(node)}</script>`);
  }

  return lines.join("\n    ");
}

export const SEO_START_MARKER = "<!--seo:start-->";
export const SEO_END_MARKER = "<!--seo:end-->";

/** Replaces the marked block of a built HTML document with route-specific tags. */
export function injectSeoHead(template: string, head: string): string {
  const start = template.indexOf(SEO_START_MARKER);
  const end = template.indexOf(SEO_END_MARKER);

  if (start === -1 || end === -1 || end < start) {
    throw new Error("SEO markers are missing from the built index.html");
  }

  return (
    template.slice(0, start) +
    SEO_START_MARKER +
    "\n    " +
    head +
    "\n    " +
    SEO_END_MARKER +
    template.slice(end + SEO_END_MARKER.length)
  );
}

/** HTML file path (relative to the build output) for a route. */
export function htmlFileFor(path: string): string {
  return path === "/" ? "index.html" : `${path.replace(/^\//, "")}.html`;
}

export function buildSitemap(routes: PrerenderRoute[] = getSitemapRoutes()): string {
  const urls = routes
    .map((entry) => `  <url>\n    <loc>${entry.canonical}</loc>\n  </url>`)
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    "</urlset>",
    "",
  ].join("\n");
}

/** Builds the 404 document: branded shell, no canonical, noindex. */
export function buildNotFoundHtml(template: string): string {
  const entry: PrerenderRoute = {
    path: "/404",
    meta: NOT_FOUND_META,
    canonical: "",
    indexable: false,
    structuredData: [],
  };

  return injectSeoHead(template, renderSeoHead(entry));
}
