/// <reference types="vite/client" />

declare module "virtual:blog-posts" {
  import type { BlogPost } from "@/lib/blog";
  const posts: BlogPost[];
  export default posts;
}
