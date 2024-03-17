
import path from 'path';
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { parseMDX, readMDXFile } from "~/server/parser/parser";
import { z } from "zod";



const contentPath = path.join(process.cwd(), 'src', 'content');

export const markdownRouter = createTRPCRouter({
  careerPage: publicProcedure
    .query(async () => {
      const careerMDXContent = await readMDXFile(path.join(contentPath, '/pages/resume.mdx'));
      return {
        ...parseMDX(careerMDXContent, true),
      }
    }),
  getBlogBySlug: publicProcedure.input(z.string()).query(async ({ input }) => {
    const blogMDXContent = await readMDXFile(path.join(contentPath, '/blogs', `${input}.mdx`));
    const { metadata, source } = parseMDX(blogMDXContent);
    return {
      metadata: {
        ...metadata,
        tags: metadata.tags.split(',').map((tag) => tag.trim()),
        viewCount: 0,
      },
      source,
    }

  })
});
