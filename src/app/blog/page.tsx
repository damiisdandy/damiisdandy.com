import BlogItem from "~/components/blog-item/blog-item";
import Heading from "~/components/heading/heading";
import Link from "~/components/link/link";
import { api } from "~/trpc/server";

export default async function Blog() {
  const blogs = await api.markdown.getBlogs({});
  return (
    <div>
      <Heading>Blog</Heading>
      <p>
        I have written a series of articles covering various software
        development concepts. Additionally, I document my projects and the
        lessons I learn from them. You can explore these articles and project
        documentation at <Link href="/projects">projects</Link>.
      </p>
      <div className="mt-12 space-y-10">
        {blogs.map((blog) => (
          <BlogItem key={blog.slug} {...blog} />
        ))}
      </div>
    </div>
  );
}
