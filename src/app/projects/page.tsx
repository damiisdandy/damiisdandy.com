import { type Metadata } from "next";
import BlogItem from "~/components/blog-item/blog-item";
import Heading from "~/components/heading/heading";
import { api } from "~/trpc/server";

export const metadata: Metadata = {
  title: "Project",
  description: "What I have built",
};

export default async function Blog() {
  const projects = await api.markdown.getAllContentByType({ type: "project" });
  return (
    <div>
      <Heading>Projects</Heading>
      <p>
        Here are list of projects I have built. I have documented the code and
        how I built them.
      </p>
      <div className="mt-12 space-y-10">
        {projects.map((blog) => (
          <BlogItem isProject key={blog.slug} {...blog} />
        ))}
      </div>
    </div>
  );
}
