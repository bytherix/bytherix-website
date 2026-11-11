import { describe, expect, it } from "vitest";

import { canonicalFor, humanizeSlug, resolveMeta, SITE_URL } from "./seo";

describe("resolveMeta", () => {
  it("returns page-specific metadata for known routes", () => {
    const home = resolveMeta("/");
    const about = resolveMeta("/about-company");

    expect(home.title).toContain("Bytherix Technology");
    expect(about.title).not.toBe(home.title);
    expect(about.description.length).toBeGreaterThan(40);
  });

  it("marks account pages as non-indexable", () => {
    expect(resolveMeta("/login").robots).toBe("noindex, nofollow");
    expect(resolveMeta("/register").robots).toBe("noindex, nofollow");
  });

  it("treats trailing slashes as the same route", () => {
    expect(resolveMeta("/about-company/")).toEqual(resolveMeta("/about-company"));
  });

  it("builds a readable fallback for dynamic routes", () => {
    expect(resolveMeta("/blogs/ai-ml").title).toContain("AI ML");
    expect(resolveMeta("/team/nikesh-munikar").title).toContain("Nikesh Munikar");
  });

  it("returns noindex metadata for unknown routes", () => {
    const meta = resolveMeta("/this-page-does-not-exist");

    expect(meta.robots).toBe("noindex, follow");
    expect(meta.title).toContain("Page Not Found");
  });
});

describe("canonicalFor", () => {
  it("returns the site root with a trailing slash", () => {
    expect(canonicalFor("/")).toBe(`${SITE_URL}/`);
  });

  it("strips trailing slashes from nested routes", () => {
    expect(canonicalFor("/blogs/ai-ml/")).toBe(`${SITE_URL}/blogs/ai-ml`);
  });
});

describe("humanizeSlug", () => {
  it("uppercases known acronyms", () => {
    expect(humanizeSlug("ai-ml-ui-ux")).toBe("AI ML UI UX");
  });

  it("title-cases regular words", () => {
    expect(humanizeSlug("one-for-all")).toBe("One For All");
  });
});
