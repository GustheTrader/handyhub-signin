import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "node:fs";
import { componentTagger } from "lovable-tagger";
import { blogPostsPlugin } from "./build/blog-posts";

const BLOG_DIR = path.resolve(__dirname, "content/blog");

function readFrontmatter(raw: string) {
  if (!raw.startsWith("---")) return { meta: {} as Record<string, string>, body: raw };
  const end = raw.indexOf("\n---", 3);
  if (end === -1) return { meta: {} as Record<string, string>, body: raw };

  const meta: Record<string, string> = {};
  for (const line of raw.slice(3, end).split("\n")) {
    const colon = line.indexOf(":");
    if (colon === -1) continue;
    const key = line.slice(0, colon).trim();
    if (!key) continue;
    let value = line.slice(colon + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    meta[key] = value;
  }
  return { meta, body: raw.slice(end + 4).replace(/^\n+/, "") };
}

function loadPosts() {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md") && !file.startsWith("README"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
      const { meta, body } = readFrontmatter(raw);
      const dateFromFile = file.match(/^(\d{4}-\d{2}-\d{2})/)?.[1] ?? "";

      return {
        slug: meta.slug || file.replace(/^\d{4}-\d{2}-\d{2}-/, "").replace(/\.md$/, ""),
        title: meta.title || file,
        publishDate: meta.publish_date || dateFromFile,
        category: meta.category || "Handyman",
        services: (meta.services || "")
          .replace(/^\[|\]$/g, "")
          .split(",")
          .map((s) => s.trim().replace(/^["']|["']$/g, ""))
          .filter(Boolean),
        readTime: meta.read_time || "",
        summary: meta.seo_description || "",
        body,
      };
    })
    .sort((a, b) => (a.publishDate < b.publishDate ? 1 : -1));
}

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    blogPostsPlugin(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    __BLOG_POSTS__: JSON.stringify(loadPosts()),
  },
}));
