import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, ArrowRight, CalendarDays, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { adjacentPosts, formatDate, postBySlug } from "@/lib/blog";

const BlogPost = () => {
  const { slug = "" } = useParams();
  const post = postBySlug(slug);
  const { newer, older } = adjacentPosts(slug);

  useEffect(() => {
    if (!post) return;
    document.title = `${post.title} | Truckee Meadows Handyman`;
    let el = document.head.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute("name", "description");
      document.head.appendChild(el);
    }
    el.content = post.description;
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [post]);

  if (!post) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="container mx-auto flex flex-grow flex-col items-center justify-center px-4 py-24 text-center">
          <h1 className="text-2xl font-extrabold text-foreground">That post does not exist</h1>
          <p className="mt-2 text-muted-foreground">It may have been renamed or retired.</p>
          <Link
            to="/blog"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-[hsl(26_100%_60%)] via-[hsl(16_92%_54%)] to-[hsl(4_88%_52%)] px-5 py-2.5 text-sm font-bold text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            All posts
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="relative overflow-hidden pb-8 pt-14">
          <div className="hero-surface pointer-events-none absolute inset-x-0 top-0 -z-10 h-[360px] opacity-70" />
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl">
              <Link
                to="/blog"
                className="inline-flex items-center gap-1.5 text-[0.78rem] font-bold uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-primary"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                All posts
              </Link>

              <div className="mt-5 flex flex-wrap items-center gap-3 text-[0.66rem] font-bold uppercase tracking-[0.16em]">
                <span className="rounded-full bg-gradient-to-br from-[hsl(26_100%_60%)] via-[hsl(16_92%_54%)] to-[hsl(4_88%_52%)] px-2.5 py-1 text-white">
                  {post.category}
                </span>
                <span className="inline-flex items-center gap-1 text-muted-foreground">
                  <CalendarDays className="h-3 w-3" />
                  {formatDate(post.date)}
                </span>
                <span className="inline-flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {post.readTime}
                </span>
              </div>

              <h1 className="mt-4 text-[1.9rem] font-extrabold leading-[1.12] tracking-[-0.025em] text-foreground md:text-[2.6rem]">
                {post.title}
              </h1>
              <p className="mt-4 text-[1.05rem] leading-relaxed text-muted-foreground">
                {post.description}
              </p>
            </div>
          </div>
        </section>

        <section className="pb-20">
          <div className="container mx-auto px-4 md:px-6">
            <article className="prose-tmh mx-auto max-w-3xl">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
            </article>

            <div className="mx-auto mt-12 max-w-3xl">
              <div className="glass-chip rounded-[24px] p-7">
                <p className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                  Need this done in Reno or Sparks?
                </p>
                <h2 className="mt-2 text-xl font-extrabold text-foreground">
                  We handle the fix, and the cleanup.
                </h2>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  Licensed and insured, with a 5-year workmanship warranty on repairs we perform.
                </p>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  <Link
                    to="/#contact"
                    className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-br from-[hsl(26_100%_60%)] via-[hsl(16_92%_54%)] to-[hsl(4_88%_52%)] px-5 py-2.5 text-sm font-bold text-white shadow-[0_12px_26px_-12px_hsl(14_92%_45%/0.95)]"
                  >
                    Request a quote
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to={`/blog/${newer?.slug ?? older?.slug ?? ""}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/70 bg-white/60 px-5 py-2.5 text-sm font-bold text-foreground backdrop-blur-xl hover:bg-white/85"
                  >
                    {newer ? "Newer post" : older ? "Older post" : "All posts"}
                  </Link>
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {[newer, older].filter(Boolean).map((p) => (
                  <Link
                    key={p!.slug}
                    to={`/blog/${p!.slug}`}
                    className="glass-chip group rounded-[20px] p-5"
                  >
                    <span className="text-[0.64rem] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                      {p!.slug === newer?.slug ? "Newer" : "Older"}
                    </span>
                    <p className="mt-1.5 text-[0.95rem] font-extrabold leading-snug text-foreground group-hover:text-primary">
                      {p!.title}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
