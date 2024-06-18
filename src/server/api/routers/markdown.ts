import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  getAllFilesInDir,
  parseMDX,
  readMDXFile,
} from "~/server/parser/parser";
import { z } from "zod";
import path from "path";


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
    const gitHubURL = "https://github.com/damiisdandy/damiisdandy.com/blob/main/"
    const filePath = `/blogs/${input}.mdx`;
    const gitHubPage = path.join("src", "content", filePath);
    const blogMDXContent = await readMDXFile(filePath);
    const { metadata, source } = parseMDX(blogMDXContent);
    return {
      metadata: {
        ...metadata,
        tags: metadata.tags.split(",").map((tag) => tag.trim()),
        viewCount: 0,
        gitHubPage: gitHubURL + gitHubPage,
      },
      source,
    };
  }),
});
