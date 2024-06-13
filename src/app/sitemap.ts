import { api } from "~/trpc/server";

export default async function sitemap() {
  const blogs = await api.markdown.getBlogs({});

  const routes = ["", "/blog", "/career", "/projects", "/work"].map(
    (route) => ({
      url: `https://damiisdandy.com${route}`,
      lastModified: new Date().toISOString().split("T")[0],
    }),
  );

  const blogURLs = blogs.map((blog) => ({
    url: `https://damiisdandy.com/blog/${blog.slug}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogURLs];
}
