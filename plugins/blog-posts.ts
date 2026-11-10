import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";

const BLOG_DIR = "content/blog";

type Frontmatter = Record<string, string | string[]>;

const parseScalar = (raw: string): string | string[] => {
  const value = raw.trim();
  if (value.startsWith("[") && value.endsWith("]")) {
    return value
      .slice(1, -1)
      .split(",")
      .map((item) => item.trim().replace(/^["']|["']$/g, ""))
      .filter(Boolean);
  }
  const quoted = /^"(.*)"$/.exec(value) ?? /^'(.*)'$/.exec(value);
  return quoted ? quoted[1] : value;
};

const parsePost = (filename: string) => {
  const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf8");
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw);
  if (!match) return null;

  const meta: Frontmatter = {};
  for (const line of match[1].split(/\r?\n/)) {
    const kv = /^([A-Za-z_][\w-]*):\s*(.*)$/.exec(line);
    if (kv) meta[kv[1]] = parseScalar(kv[2]);
  }

  const asArray = (value: string | string[] | undefined) =>
    (Array.isArray(value) ? value : value ? [value] : []) as string[];

  const slug = (meta.slug as string) || filename.replace(/^\d{4}-\d{2}-\d{2}-/, "").replace(/\.md$/, "");
  const publishDate = String(meta.publish_date ?? filename.slice(0, 10));

  return {
    slug,
    title: String(meta.title ?? slug),
    publishDate,
    category: String(meta.category ?? "Home Care"),
    services: asArray(meta.services),
    readTime: String(meta.read_time ?? ""),
    summary: String(meta.seo_description ?? ""),
    body: match[2].trim(),
  };
};

const loadPosts = () => {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md"))
    .map(parsePost)
    .filter((post): post is NonNullable<typeof post> => post !== null)
    .sort((a, b) =>
      a.publishDate === b.publishDate
        ? a.title.localeCompare(b.title)
        : a.publishDate.localeCompare(b.publishDate),
    )
    .reverse();
};

export const blogPosts = (): Plugin => {
  const virtualId = "virtual:blog-posts";
  const resolvedId = `\0${virtualId}`;
  let watched = new Set<string>();

  return {
    name: "blog-posts",
    resolveId(id) {
      if (id === virtualId) return resolvedId;
      return null;
    },
    load(id) {
      if (id !== resolvedId) return null;
      const posts = loadPosts();
      watched = new Set(posts.map((post) => post.slug));
      return `export default ${JSON.stringify(posts)};`;
    },
    configureServer(server) {
      const dir = path.resolve(BLOG_DIR);
      if (!fs.existsSync(dir)) return;
      server.watcher.add(dir);
      server.watcher.on("all", (_event, file) => {
        if (!file.startsWith(dir)) return;
        const mod = server.moduleGraph.getModuleById(resolvedId);
        if (mod) server.moduleGraph.invalidateModule(mod);
        server.ws.send({ type: "full-reload" });
      });
    },
    buildStart() {
      const dir = path.resolve(BLOG_DIR);
      if (!fs.existsSync(dir)) return;
      for (const file of fs.readdirSync(dir)) {
        if (file.endsWith(".md")) this.addWatchFile(path.join(dir, file));
      }
    },
  };
};
