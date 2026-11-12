import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import {
  canonicalFor,
  NOT_FOUND_META,
  resolveMeta,
  SITE_NAME,
  SITE_URL,
  socialImageFor,
} from "../../lib/seo";

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

const removeMeta = (name: string, attribute: "name" | "property" = "name") => {
  document.head.querySelector(`meta[${attribute}="${name}"]`)?.remove();
};

const removeCanonical = () => {
  document.head.querySelector('link[rel="canonical"]')?.remove();
};

/**
 * Keeps document title, description, canonical and social metadata in sync
 * with the current route. Rendered once inside the layout.
 *
 * The initial HTML already carries the correct tags for every prerendered
 * route; this keeps client-side navigation consistent with them and removes
 * the canonical on unknown paths, which must never claim to be indexable.
 */
const RouteMeta = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = resolveMeta(pathname);
    const isNotFound = meta === NOT_FOUND_META;
    const canonical = isNotFound ? "" : canonicalFor(pathname);
    const image = socialImageFor(pathname);
    const imageUrl = `${SITE_URL}${image.path}`;
    const ogType = !isNotFound && pathname.startsWith("/blogs/") ? "article" : "website";

    document.title = meta.title;

    upsertMeta("description", meta.description);
    upsertMeta("robots", meta.robots ?? "index, follow");

    upsertMeta("og:type", ogType, "property");
    upsertMeta("og:title", meta.title, "property");
    upsertMeta("og:description", meta.description, "property");
    upsertMeta("og:site_name", SITE_NAME, "property");
    upsertMeta("og:image", imageUrl, "property");
    upsertMeta("og:image:width", String(image.width), "property");
    upsertMeta("og:image:height", String(image.height), "property");
    upsertMeta("og:image:alt", image.alt, "property");

    if (canonical) {
      upsertCanonical(canonical);
      upsertMeta("og:url", canonical, "property");
    } else {
      removeCanonical();
      removeMeta("og:url", "property");
    }

    upsertMeta("twitter:title", meta.title);
    upsertMeta("twitter:description", meta.description);
    upsertMeta("twitter:image", imageUrl);
    upsertMeta("twitter:image:alt", image.alt);
  }, [pathname]);

  return null;
};

export default RouteMeta;
