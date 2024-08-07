import { api } from "~/trpc/server";

export default async function sitemap() {
  const blogs = await api.markdown.getAllContentByType({
    type: "all",
  });

  const routes = ["", "/blog", "/career", "/projects", "/work"].map(
    (route) => ({
      url: `https://damiisdandy.com${route}`,
      lastModified: new Date().toISOString().split("T")[0],
    }),
  );

  const blogURLs = blogs.map((blog) => ({
    url: `https://damiisdandy.com/${blog.type === "project" ? "projects" : "blog"}/${blog.slug}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogURLs];
}
