import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { canonicalFor, resolveMeta, SITE_NAME } from "../../lib/seo";

const upsertMeta = (name: string, content: string, attribute: "name" | "property" = "name") => {
  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${name}"]`,
  );

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
};

const upsertCanonical = (href: string) => {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
};

/**
 * Keeps document title, description, canonical and social metadata in sync
 * with the current route. Rendered once inside the layout.
 */
const RouteMeta = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = resolveMeta(pathname);
    const canonical = canonicalFor(pathname);

    document.title = meta.title;

    upsertMeta("description", meta.description);
    upsertMeta("robots", meta.robots ?? "index, follow");
    upsertCanonical(canonical);

    upsertMeta("og:title", meta.title, "property");
    upsertMeta("og:description", meta.description, "property");
    upsertMeta("og:url", canonical, "property");
    upsertMeta("og:site_name", SITE_NAME, "property");

    upsertMeta("twitter:title", meta.title);
    upsertMeta("twitter:description", meta.description);
  }, [pathname]);

  return null;
};

export default RouteMeta;
