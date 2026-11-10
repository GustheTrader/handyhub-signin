import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Search, Wrench } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogPosts, categories, formatDate } from "@/lib/blog";
import { cn } from "@/lib/utils";

const Blog = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Home Repair Blog | Truckee Meadows Handyman";
    let el = document.head.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute("name", "description");
      document.head.appendChild(el);
    }
    el.content =
      "Practical home repair guides for Reno and Sparks homeowners — flooring, electrical, doors, assembly, kitchens, and baths, with real costs and local climate notes.";
  }, []);

  const posts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return blogPosts.filter((p) => {
      if (category && p.category !== category) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.services.some((s) => s.toLowerCase().includes(q))
      );
    });
  }, [query, category]);

  const [lead, ...rest] = posts;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="relative overflow-hidden pb-10 pt-16">
          <div className="hero-surface pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] opacity-80" />
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/70 bg-white/60 px-3.5 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-muted-foreground backdrop-blur-xl">
                <Wrench className="h-3.5 w-3.5 text-primary" />
                The Field Notes
              </span>
              <h1 className="mt-5 text-[2.1rem] font-extrabold leading-[1.1] tracking-[-0.025em] text-foreground md:text-[3rem]">
                Home repair advice,
                <span className="text-gradient-warm"> minus the guesswork</span>
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-[1.02rem] leading-relaxed text-muted-foreground">
                What we actually find in Truckee Meadows homes — real costs, code references, and the
                fixes worth paying for. Written by the people doing the work, not a content farm.
              </p>

              <div className="mx-auto mt-7 flex max-w-xl items-center gap-2">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search posts — flooring, GFCI, caulk…"
                    aria-label="Search blog posts"
                    className="w-full rounded-full border border-white/70 bg-white/60 py-3 pl-11 pr-4 text-sm font-medium text-foreground shadow-[inset_0_1px_0_hsl(0_0%_100%/0.8)] backdrop-blur-xl outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary/40 focus:bg-white/85"
                  />
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                <button
                  onClick={() => setCategory(null)}
                  className={cn(
                    "rounded-full px-3.5 py-1.5 text-[0.76rem] font-bold transition-colors",
                    category === null
                      ? "bg-gradient-to-br from-[hsl(26_100%_60%)] via-[hsl(16_92%_54%)] to-[hsl(4_88%_52%)] text-white shadow-[0_10px_22px_-12px_hsl(14_92%_45%/0.9)]"
                      : "border border-white/70 bg-white/55 text-muted-foreground backdrop-blur-xl hover:bg-white/85 hover:text-foreground",
                  )}
                >
                  All
                </button>
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(category === c ? null : c)}
                    className={cn(
                      "rounded-full px-3.5 py-1.5 text-[0.76rem] font-bold transition-colors",
                      category === c
                        ? "bg-gradient-to-br from-[hsl(26_100%_60%)] via-[hsl(16_92%_54%)] to-[hsl(4_88%_52%)] text-white shadow-[0_10px_22px_-12px_hsl(14_92%_45%/0.9)]"
                        : "border border-white/70 bg-white/55 text-muted-foreground backdrop-blur-xl hover:bg-white/85 hover:text-foreground",
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="pb-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-5xl">
              {posts.length === 0 && (
                <p className="glass-chip rounded-[24px] p-10 text-center text-sm text-muted-foreground">
                  Nothing matches “{query}”. Try a broader term like <em>flooring</em> or <em>doors</em>.
                </p>
              )}

              {lead && (
                <Link
                  to={`/blog/${lead.slug}`}
                  className="glass-chip group mb-6 flex flex-col gap-4 rounded-[28px] p-7 md:flex-row md:items-center md:justify-between md:p-9"
                >
                  <div className="max-w-2xl">
                    <div className="flex flex-wrap items-center gap-3 text-[0.66rem] font-bold uppercase tracking-[0.16em]">
                      <span className="rounded-full bg-gradient-to-br from-[hsl(26_100%_60%)] via-[hsl(16_92%_54%)] to-[hsl(4_88%_52%)] px-2.5 py-1 text-white">
                        Latest
                      </span>
                      <span className="text-muted-foreground">{formatDate(lead.date)}</span>
                      <span className="inline-flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {lead.readTime}
                      </span>
                    </div>
                    <h2 className="mt-3 text-[1.45rem] font-extrabold leading-[1.18] tracking-[-0.018em] text-foreground group-hover:text-primary md:text-[1.75rem]">
                      {lead.title}
                    </h2>
                    <p className="mt-2 text-[0.94rem] leading-relaxed text-muted-foreground">
                      {lead.description}
                    </p>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-primary">
                    Read
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              )}

              <div className="grid gap-5 sm:grid-cols-2">
                {rest.map((p) => (
                  <Link
                    key={p.slug}
                    to={`/blog/${p.slug}`}
                    className="glass-chip group flex flex-col rounded-[24px] p-6"
                  >
                    <div className="flex items-center justify-between gap-3 text-[0.66rem] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                      <span className="rounded-full bg-white/70 px-2.5 py-1 text-primary">{p.category}</span>
                      <span>{formatDate(p.date)}</span>
                    </div>
                    <h3 className="mt-3 text-[1.08rem] font-extrabold leading-[1.25] tracking-[-0.012em] text-foreground group-hover:text-primary">
                      {p.title}
                    </h3>
                    <p className="mt-2 flex-1 text-[0.88rem] leading-relaxed text-muted-foreground">
                      {p.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-[0.78rem] font-bold text-primary">
                      <Clock className="h-3.5 w-3.5" />
                      {p.readTime}
                      <ArrowRight className="ml-auto h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
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

export default Blog;
