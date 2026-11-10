import { useEffect } from "react";

type Meta = { title: string; description?: string };

const setTag = (selector: string, create: () => HTMLMetaElement, attr: "name" | "property", key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = create();
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

export function usePageMeta({ title, description }: Meta) {
  useEffect(() => {
    document.title = title;
    if (!description) return;
    setTag(
      'meta[name="description"]',
      () => document.createElement("meta"),
      "name",
      "description",
      description,
    );
    setTag(
      'meta[property="og:description"]',
      () => document.createElement("meta"),
      "property",
      "og:description",
      description,
    );
    setTag('meta[property="og:title"]', () => document.createElement("meta"), "property", "og:title", title);
  }, [title, description]);
}
