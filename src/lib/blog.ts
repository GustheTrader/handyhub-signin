import posts from "virtual:blog-posts";

export type { BlogPost } from "../../build/blog-posts";

export const blogPosts = posts;

export const postBySlug = (slug: string) => posts.find((p) => p.slug === slug);

export const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

export const categories = Array.from(new Set(posts.map((p) => p.category))).sort();

export const adjacentPosts = (slug: string) => {
  const i = posts.findIndex((p) => p.slug === slug);
  return {
    newer: i > 0 ? posts[i - 1] : undefined,
    older: i >= 0 && i < posts.length - 1 ? posts[i + 1] : undefined,
  };
};
