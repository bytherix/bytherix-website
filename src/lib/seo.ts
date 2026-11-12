export const SITE_URL = "https://bytherixtechnology.com";
export const SITE_NAME = "Bytherix Technology";

export interface PageMeta {
  title: string;
  description: string;
  /** Robots directive; defaults to "index, follow". */
  robots?: string;
}

const DEFAULT_DESCRIPTION =
  "Kathmandu-based software company building web, mobile, AI/ML, cloud, cybersecurity and design solutions for businesses in Nepal and beyond.";

const STATIC_META: Record<string, PageMeta> = {
  "/": {
    title: "Bytherix Technology | Software, AI & Digital Solutions",
    description: DEFAULT_DESCRIPTION,
  },
  "/about-company": {
    title: "About Bytherix Technology | Kathmandu Software Company",
    description:
      "Learn about Bytherix Technology: our mission, team, technology stack and development workflow as a software company based in Kathmandu, Nepal.",
  },
  "/our-team": {
    title: "Our Team | Bytherix Technology",
    description:
      "Meet the developers, designers and engineers behind Bytherix Technology's web, mobile, AI and cloud projects.",
  },
  "/shop": {
    title: "Courses & Products | Bytherix Technology",
    description:
      "Explore Bytherix Technology courses and digital products covering web development, app development, AI/ML, cybersecurity and more.",
  },
  "/products": {
    title: "Products | Bytherix Technology",
    description:
      "Software products built by Bytherix Technology, including the One For All management system, PAM and our founder-focused product line.",
  },
  "/products/our-founder": {
    title: "Our Founder | Bytherix Technology Products",
    description:
      "Discover Our Founder, a Bytherix Technology product built to support founders and small teams.",
  },
  "/products/one-for-all": {
    title: "One For All Management System | Bytherix Technology",
    description:
      "One For All is a management system by Bytherix Technology for running day-to-day business operations in one place.",
  },
  "/products/pam": {
    title: "PAM | Bytherix Technology",
    description:
      "PAM is a Bytherix Technology product designed for practical, everyday business workflows.",
  },
  "/portfolios": {
    title: "Portfolio | Bytherix Technology Projects",
    description:
      "Selected software, web and design projects delivered by Bytherix Technology for clients in Nepal and abroad.",
  },
  "/our-story": {
    title: "Our Story | Bytherix Technology",
    description:
      "How Bytherix Technology grew from an idea into a Kathmandu-based software team delivering web, mobile and AI projects.",
  },
  "/blogs": {
    title: "Blogs & Articles | Bytherix Technology",
    description:
      "Technical articles and updates from the Bytherix Technology team on software, AI/ML, cybersecurity and robotics.",
  },
  "/privacy-policy": {
    title: "Privacy Policy | Bytherix Technology",
    description:
      "How Bytherix Technology handles information submitted through this website and its contact channels.",
    robots: "noindex, follow",
  },
  "/terms-of-use": {
    title: "Terms of Use | Bytherix Technology",
    description:
      "Terms governing use of the Bytherix Technology website and its content.",
    robots: "noindex, follow",
  },
  "/sales-and-refunds": {
    title: "Sales & Refunds | Bytherix Technology",
    description:
      "Sales and refund information for Bytherix Technology products, courses and services.",
    robots: "noindex, follow",
  },
  "/login": {
    title: "Login | Bytherix Technology",
    description: "Sign in to your Bytherix Technology account.",
    robots: "noindex, nofollow",
  },
  "/register": {
    title: "Register | Bytherix Technology",
    description: "Create a Bytherix Technology account.",
    robots: "noindex, nofollow",
  },
};

export const NOT_FOUND_META: PageMeta = {
  title: "Page Not Found | Bytherix Technology",
  description: "The page you requested could not be found on the Bytherix Technology website.",
  robots: "noindex, follow",
};

/** Turns "one-for-all" / "ai-ml" into "One For All" / "Ai Ml". */
export function humanizeSlug(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => {
      const lower = part.toLowerCase();
      if (lower === "ai") return "AI";
      if (lower === "ml") return "ML";
      if (lower === "ui") return "UI";
      if (lower === "ux") return "UX";
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(" ");
}

/**
 * Keeps meta descriptions inside the length search engines actually display.
 * Shared by the client-side route metadata and the build-time prerenderer so
 * the server HTML and the hydrated DOM never disagree.
 */
export function clampDescription(text: string, max = 158): string {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= max) return normalized;

  const cut = normalized.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 100 ? cut.slice(0, lastSpace) : cut).replace(/[,;:.\s]+$/, "")}…`;
}

/** Resolves metadata for a pathname. Dynamic routes get a humanised fallback. */
export function resolveMeta(pathname: string): PageMeta {
  const meta = resolveMetaRaw(pathname);
  const description = clampDescription(meta.description);

  return description === meta.description ? meta : { ...meta, description };
}

function resolveMetaRaw(pathname: string): PageMeta {
  const clean = pathname.replace(/\/+$/, "") || "/";
  // URLs are case-sensitive on the web but routes here are lower-case; accept
  // mixed-case variants (e.g. /products/PAM) instead of falling through to 404 metadata.
  const exact = STATIC_META[clean] ?? STATIC_META[clean.toLowerCase()];
  if (exact) return exact;

  if (clean.startsWith("/team/")) {
    const name = humanizeSlug(clean.slice("/team/".length));
    return {
      title: `${name} | Bytherix Technology Team`,
      description: `${name} is part of the Bytherix Technology team in Kathmandu, Nepal.`,
    };
  }

  if (clean.startsWith("/blogs/")) {
    const name = humanizeSlug(clean.slice("/blogs/".length));
    return {
      title: `${name} | Bytherix Technology Blog`,
      description: `Read ${name} on the Bytherix Technology blog.`,
    };
  }

  return NOT_FOUND_META;
}

export function canonicalFor(pathname: string): string {
  const clean = pathname.replace(/\/+$/, "") || "/";
  // Prefer the canonical lower-case form when a mixed-case variant resolves
  // to a known route (e.g. /products/PAM -> /products/pam) so that both URLs
  // do not each self-canonicalise.
  const normalized =
    STATIC_META[clean] === undefined && STATIC_META[clean.toLowerCase()] !== undefined
      ? clean.toLowerCase()
      : clean;
  return normalized === "/" ? `${SITE_URL}/` : `${SITE_URL}${normalized}`;
}

export const DEFAULT_META: PageMeta = STATIC_META["/"];
