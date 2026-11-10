import type { Plugin } from "vite";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  week: number | null;
  category: string;
  services: string[];
  readTime: string;
  description: string;
  body: string;
};

const BLOG_DIR = "content/blog";

function unquote(value: string) {
  const v = value.trim();
  if (v.startsWith('"') && v.endsWith('"')) {
    return v.slice(1, -1).replace(/\\"/g, '"');
  }
  if (v.startsWith("'") && v.endsWith("'")) return v.slice(1, -1);
  return v;
}

export function parsePost(raw: string, fallbackSlug: string): BlogPost {
  const meta: Record<string, string> = {};
  let body = raw;

  if (raw.startsWith("---")) {
    const end = raw.indexOf("\n---", 3);
    if (end !== -1) {
      for (const line of raw.slice(3, end).split("\n")) {
        const colon = line.indexOf(":");
        if (colon === -1) continue;
        const key = line.slice(0, colon).trim();
        if (!key || key.startsWith("#")) continue;
        meta[key] = unquote(line.slice(colon + 1));
      }
      body = raw.slice(end + 4).replace(/^\n+/, "");
    }
  }

  const services = (meta.services ?? "")
    .replace(/^\[|\]$/g, "")
    .split(",")
    .map((s) => unquote(s))
    .filter(Boolean);

  const week = Number.parseInt(meta.week ?? "", 10);

  return {
    slug: meta.slug || fallbackSlug,
    title: meta.title || fallbackSlug,
    date: meta.publish_date || meta.date || "",
    week: Number.isFinite(week) ? week : null,
    category: meta.category || "Home Repair",
    services,
    readTime: meta.read_time || "4 min",
    description: meta.seo_description || meta.description || "",
    body: body.trim(),
  };
}

function loadPosts(): BlogPost[] {
  const dir = path.resolve(ROOT, "..", BLOG_DIR);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f: string) => f.endsWith(".md") && f.toLowerCase() !== "readme.md")
    .map((file: string) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      return parsePost(raw, file.replace(/\.md$/, ""));
    })
    .filter((p: BlogPost) => p.date)
    .sort((a: BlogPost, b: BlogPost) => b.date.localeCompare(a.date));
}

export function blogPostsPlugin(): Plugin {
  const virtualId = "virtual:blog-posts";
  const resolvedId = "\0" + virtualId;

  return {
    name: "handyhub-blog-posts",
    resolveId(id) {
      if (id === virtualId) return resolvedId;
      return null;
    },
    load(id) {
      if (id !== resolvedId) return null;
      return `export default ${JSON.stringify(loadPosts())};`;
    },
    configureServer(server) {
      server.watcher.add(path.resolve(ROOT, "..", BLOG_DIR));
      server.watcher.on("change", (file: string) => {
        if (file.includes("content/blog") && file.endsWith(".md")) {
          const mod = server.moduleGraph.getModuleById(resolvedId);
          if (mod) server.moduleGraph.invalidateModule(mod);
          server.ws.send({ type: "full-reload" });
        }
      });
    },
  };
}
