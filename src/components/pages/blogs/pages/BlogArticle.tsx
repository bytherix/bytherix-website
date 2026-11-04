import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import BlogBackground from "../../blogs/BlogBackground";
import { BLOG_POSTS } from "../data/blog.constants";

export default function BlogArticle() {
  const navigate = useNavigate();
  const { slug } = useParams();

  const post = BLOG_POSTS.find((item) => item.slug === slug);

  if (!post) {
    return (
      <main className="homepage-gutters flex min-h-screen items-center justify-center bg-white dark:bg-[#020817]">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#3157D5]/10 text-[#3157D5] dark:bg-[#3157D5]/15">
            <ArrowLeft size={26} />
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-[#0E1F5A] dark:text-white sm:text-4xl">
            Blog not found
          </h1>

          <p className="mt-3 text-sm leading-6 text-black/55 dark:text-white/55 sm:text-base">
            The article you are looking for could not be found.
          </p>

          <button
            type="button"
            onClick={() => navigate("/blogs")}
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#3157D5] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#3157D5]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2546B8] hover:shadow-xl hover:shadow-[#3157D5]/25"
          >
            <ArrowLeft size={17} />
            Back to Blogs
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-[#0E1F5A] transition-colors duration-300 dark:bg-[#020817] dark:text-white">
      <BlogBackground />

      <section className="homepage-gutters relative z-10 pb-16 pt-24 sm:pb-20 sm:pt-28 lg:pb-24 lg:pt-32">
        <div className="mx-auto w-full max-w-6xl">
          {/* Top Back Button */}
          <button
            type="button"
            onClick={() => navigate("/blogs")}
            className="group mb-6 inline-flex items-center gap-2 rounded-full border border-[#3157D5]/15 bg-white/70 px-4 py-2 text-sm font-semibold text-[#3157D5] backdrop-blur-md transition-all duration-300 hover:-translate-x-0.5 hover:border-[#3157D5]/30 hover:bg-[#3157D5]/5 dark:border-white/10 dark:bg-white/[0.04] dark:text-[#6F8EFF] dark:hover:border-[#6F8EFF]/30 dark:hover:bg-[#6F8EFF]/5 sm:mb-8"
          >
            <ArrowLeft
              size={17}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            Back to Blogs
          </button>

          {/* Article Card */}
          <article className="overflow-hidden rounded-[24px] border border-black/[0.06] bg-white/95 shadow-[0_25px_100px_rgba(14,31,90,0.10)] backdrop-blur-xl transition-colors duration-300 dark:border-white/[0.08] dark:bg-[#071126]/95 dark:shadow-[0_25px_100px_rgba(0,0,0,0.35)] sm:rounded-[30px] lg:rounded-[36px]">
            {/* Featured Image */}
            <div className="relative flex min-h-[220px] w-full items-center justify-center overflow-hidden bg-[#F4F7FF] px-4 py-4 dark:bg-[#0A1429] sm:min-h-[320px] sm:px-8 sm:py-8 lg:min-h-[420px] lg:px-12 lg:py-12">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(49,87,213,0.12),transparent_45%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(49,87,213,0.16),transparent_45%)]" />

              <img
                src={post.image}
                alt={post.title}
                className="relative z-10 max-h-[520px] w-full object-contain"
              />
            </div>

            {/* Article Content */}
            <div className="px-5 py-8 sm:px-8 sm:py-10 md:px-12 md:py-12 lg:px-20 lg:py-16">
              {/* Article Header */}
              <header className="max-w-4xl">
                <h1 className="text-3xl font-bold leading-[1.15] tracking-[-0.025em] text-[#0E1F5A] dark:text-white sm:text-4xl sm:leading-[1.12] md:text-[2.75rem] lg:text-5xl lg:leading-[1.08]">
                  {post.title}
                </h1>

                <div className="mt-6 h-px w-full bg-gradient-to-r from-[#3157D5]/25 via-[#20C997]/15 to-transparent dark:from-[#3157D5]/35 dark:via-[#20C997]/20" />

                <p className="mt-6 text-base leading-7 text-black/65 dark:text-white/65 sm:mt-7 sm:text-lg sm:leading-8 lg:text-[19px]">
                  {post.description}
                </p>
              </header>

              {/* Article Body */}
              <div className="mt-9 max-w-4xl space-y-7 sm:mt-11 sm:space-y-8">
                {post.content.map((block, index) => {
                  if (block.type === "heading") {
                    return (
                      <h2
                        key={index}
                        className="pt-3 text-2xl font-bold leading-tight tracking-[-0.015em] text-[#0E1F5A] dark:text-white sm:pt-5 sm:text-3xl lg:text-[32px]"
                      >
                        {block.content as string}
                      </h2>
                    );
                  }

                  if (block.type === "paragraph") {
                    return (
                      <p
                        key={index}
                        className="text-[15.5px] leading-7 text-black/70 dark:text-white/65 sm:text-[17px] sm:leading-8"
                      >
                        {block.content as string}
                      </p>
                    );
                  }

                  if (block.type === "list") {
                    return (
                      <ul
                        key={index}
                        className="space-y-3 pl-5 text-[15.5px] leading-7 text-black/70 dark:text-white/65 sm:pl-6 sm:text-[17px] sm:leading-8"
                      >
                        {(block.content as string[]).map(
                          (item, itemIndex) => (
                            <li
                              key={itemIndex}
                              className="relative pl-2 marker:text-[#3157D5] dark:marker:text-[#6F8EFF]"
                            >
                              {item}
                            </li>
                          ),
                        )}
                      </ul>
                    );
                  }

                  if (block.type === "quote") {
                    return (
                      <blockquote
                        key={index}
                        className="relative my-8 overflow-hidden rounded-r-2xl border-l-4 border-[#3157D5] bg-[#F4F7FF] px-5 py-5 text-[15.5px] font-semibold leading-7 text-[#0E1F5A] dark:bg-[#0B1730] dark:text-white/85 sm:px-7 sm:py-6 sm:text-lg sm:leading-8"
                      >
                        <span className="absolute -left-1 -top-5 text-7xl font-serif leading-none text-[#3157D5]/10 dark:text-[#6F8EFF]/10">
                          “
                        </span>

                        <span className="relative z-10">
                          {block.content as string}
                        </span>
                      </blockquote>
                    );
                  }

                  return null;
                })}
              </div>

              {/* Bottom Back CTA */}
              <div className="mt-12 border-t border-black/[0.07] pt-8 dark:border-white/[0.08] sm:mt-16 sm:pt-10">
                <button
                  type="button"
                  onClick={() => navigate("/blogs")}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[#3157D5]/15 bg-[#F4F7FF] px-5 py-4 text-sm font-semibold text-[#3157D5] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#3157D5]/30 hover:bg-[#3157D5]/5 hover:shadow-lg hover:shadow-[#3157D5]/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-[#7D99FF] dark:hover:border-[#7D99FF]/25 dark:hover:bg-[#7D99FF]/5 sm:w-auto sm:rounded-full sm:px-6"
                >
                  <ArrowLeft
                    size={17}
                    className="transition-transform duration-300 group-hover:-translate-x-1"
                  />

                  Back to Blogs
                </button>
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}