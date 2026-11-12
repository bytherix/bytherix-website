import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import type { Plugin } from "vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import {
  buildNotFoundHtml,
  getPrerenderRoutes,
  htmlFileFor,
  injectSeoHead,
  renderSeoHead,
} from "./src/lib/prerender.ts";

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

      const indexable = routes.filter((route) => route.indexable).length;
      // eslint-disable-next-line no-console
      console.log(
        `[seo-prerender] wrote ${routes.length} route documents (${indexable} indexable) + 404.html`,
      );
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), seoPrerender()],
});
