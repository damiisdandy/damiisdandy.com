import Badge from "~/components/badge/badge";
import Heading from "~/components/heading/heading";
import Link from "~/components/link/link";
import { api } from "~/trpc/server";
import { formatDate } from "~/utils/utils";

export default async function Blog() {
  const blogs = await api.markdown.getBlogs("");
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
          <div key={blog.slug}>
            <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
            <p className="text-sm text-neutral-400">
              Created on {formatDate(new Date(blog.publishedAt))}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              {blog.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
