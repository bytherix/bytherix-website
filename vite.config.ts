import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import type { Plugin } from "vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { BLOG_SOCIAL_IMAGES } from "./src/components/pages/blogs/data/blog.social.ts";
import {
  buildNotFoundHtml,
  buildSitemap,
  getPrerenderRoutes,
  htmlFileFor,
  injectSeoHead,
  renderSeoHead,
} from "./src/lib/prerender.ts";

/**
 * Reads the intrinsic pixel size straight from the file header, so declared
 * Open Graph dimensions can be checked against the real asset instead of being
 * trusted. Returns `null` for formats it does not parse.
 */
function readImageSize(buffer: Buffer): { width: number; height: number } | null {
  // PNG: 8-byte signature, then an IHDR chunk whose width/height are at 16/20.
  if (buffer.length > 24 && buffer.readUInt32BE(0) === 0x89504e47) {
    return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
  }

  // JPEG: walk the marker segments until the first start-of-frame marker.
  if (buffer.length > 4 && buffer[0] === 0xff && buffer[1] === 0xd8) {
    let offset = 2;

    while (offset + 9 < buffer.length) {
      if (buffer[offset] !== 0xff) {
        offset += 1;
        continue;
      }

      const marker = buffer[offset + 1];

      // Standalone markers carry no length field.
      if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd8)) {
        offset += 2;
        continue;
      }

      const length = buffer.readUInt16BE(offset + 2);

      // SOF0-SOF15, excluding DHT (C4), JPG (C8) and DAC (CC).
      if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
        return { height: buffer.readUInt16BE(offset + 5), width: buffer.readUInt16BE(offset + 7) };
      }

      offset += 2 + length;
    }
  }

  return null;
}

/**
 * Writes one HTML document per route into the build output, each with its own
 * title, description, canonical, robots directive, Open Graph tags and JSON-LD.
 *
 * The app itself still hydrates from the same bundle, so client-side routing,
 * animations and interactive behaviour are unchanged. Vercel serves the
 * matching `<route>.html` file (`cleanUrls`) and falls back to the SPA only for
 * paths that do not exist, which is what makes 404 status handling possible.
 */
function seoPrerender(): Plugin {
  let root = process.cwd();
  let outDir = "dist";

  return {
    name: "bytherix-seo-prerender",
    apply: "build",
    configResolved(config) {
      root = config.root;
      outDir = resolve(root, config.build.outDir);
    },
    async buildStart() {
      // Declared Open Graph dimensions must match the artwork that ships.
      for (const entry of BLOG_SOCIAL_IMAGES) {
        const file = resolve(root, "public", entry.image.replace(/^\/+/, ""));
        const buffer = await readFile(file).catch(() => null);
        const size = buffer ? readImageSize(buffer) : null;

        if (!size || size.width !== entry.width || size.height !== entry.height) {
          throw new Error(
            `[seo-prerender] social image size mismatch for ${entry.image}: declared ${entry.width}x${entry.height}, actual ${size ? `${size.width}x${size.height}` : "unreadable"}`,
          );
        }
      }
    },
    async closeBundle() {
      const templatePath = resolve(outDir, "index.html");
      const template = await readFile(templatePath, "utf8");
      const routes = getPrerenderRoutes();

      for (const route of routes) {
        const target = resolve(outDir, htmlFileFor(route.path));
        await mkdir(dirname(target), { recursive: true });
        await writeFile(target, injectSeoHead(template, renderSeoHead(route)), "utf8");
      }

      await writeFile(resolve(outDir, "404.html"), buildNotFoundHtml(template), "utf8");

      // The single source of truth for `/sitemap.xml`: derived from the same
      // route list as the documents above, so it always matches what the build
      // emits. There is deliberately no copy under `public/`.
      const sitemapRoutes = routes.filter((route) => route.indexable);
      await writeFile(resolve(outDir, "sitemap.xml"), buildSitemap(sitemapRoutes), "utf8");

      const indexable = sitemapRoutes.length;
      // eslint-disable-next-line no-console
      console.log(
        `[seo-prerender] wrote ${routes.length} route documents (${indexable} indexable) + 404.html + sitemap.xml`,
      );
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), seoPrerender()],
});
