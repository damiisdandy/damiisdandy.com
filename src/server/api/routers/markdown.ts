import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { parseMDX, readMDXFile } from "~/server/parser/parser";
import { z } from "zod";

export const markdownRouter = createTRPCRouter({
  careerPage: publicProcedure.query(async () => {
    const careerMDXContent = await readMDXFile("/pages/resume.mdx");
    return {
      ...parseMDX(careerMDXContent, true),
    };
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
