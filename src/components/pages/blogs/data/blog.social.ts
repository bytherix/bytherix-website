/**
 * Social/Open Graph metadata for published articles.
 *
 * Deliberately separate from `blog.constants.ts`: article bodies are large and
 * this module is imported by the always-loaded SEO runtime (`src/lib/seo.ts`),
 * so it must stay metadata-only. `blog-social.test.ts` keeps the two lists in
 * sync, and `vite.config.ts` fails the build if a declared image size stops
 * matching the asset in `public/blog`.
 *
 * Width and height are the verified intrinsic pixel sizes of each file, not an
 * assumption about the shared aspect ratio.
 */
export interface BlogSocialImage {
  slug: string;
  title: string;
  image: string;
  width: number;
  height: number;
}

export const BLOG_SOCIAL_IMAGES: readonly BlogSocialImage[] = [
  {
    slug: "why-nepal-needs-ai-ml-model",
    title: "Why Nepal Needs AI/ML Models",
    image: "/blog/ai-ml.jpeg",
    width: 1536,
    height: 1024,
  },
  {
    slug: "nepal-cybersecurity-level",
    title: "Nepal's Cybersecurity Level in the World",
    image: "/blog/cybersecurity.jpeg",
    width: 1536,
    height: 1024,
  },
  {
    slug: "why-robotics-companies-are-not-growing-in-nepal",
    title: "Why Are Robotics Companies Not Growing in Nepal?",
    image: "/blog/robotics.jpeg",
    width: 1536,
    height: 1024,
  },
];
