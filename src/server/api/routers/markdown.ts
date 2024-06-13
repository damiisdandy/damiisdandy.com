import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  getAllFilesInDir,
  parseMDX,
  readMDXFile,
} from "~/server/parser/parser";
import { z } from "zod";

const getBlogsInput = z.object({
  query: z.string().optional(),
  limit: z.number().optional(),
});

export const markdownRouter = createTRPCRouter({
  careerPage: publicProcedure.query(async () => {
    const careerMDXContent = await readMDXFile("/pages/resume.mdx");
    return {
      ...parseMDX(careerMDXContent, true),
    };
  }),
  getBlogs: publicProcedure
    .input(getBlogsInput)
    .query(async ({ input: { limit } }) => {
      const files = getAllFilesInDir("/blogs");
      const blogMDXContent = files.map(async (file) => {
        const fileName = file.split("/").pop() ?? "";
        const content = await readMDXFile(`/blogs/${fileName}`);
        const { metadata } = parseMDX(content);
        return {
          ...metadata,
          slug: fileName.replace(".mdx", ""),
          tags: metadata.tags.split(",").map((tag) => tag.trim()),
          viewCount: 0,
        };
      });
      const blogs = await Promise.all(blogMDXContent);
      return blogs
        .sort(
          (a, b) =>
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime(),
        )
        .slice(0, limit);
    }),
  getBlogBySlug: publicProcedure.input(z.string()).query(async ({ input }) => {
    const blogMDXContent = await readMDXFile(`/blogs/${input}.mdx`);
    const { metadata, source } = parseMDX(blogMDXContent);
    return {
      metadata: {
        ...metadata,
        tags: metadata.tags.split(",").map((tag) => tag.trim()),
        viewCount: 0,
      },
      source,
    };
  }),
});
