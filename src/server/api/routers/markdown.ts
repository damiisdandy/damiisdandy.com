
import path from 'path';
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { parseMDX, readMDXFile } from "~/server/parser/parser";


const contentPath = path.join(process.cwd(), 'src', 'content');

console.log(contentPath)

export const markdownRouter = createTRPCRouter({
  careerPage: publicProcedure
    .query(() => {
      const careerMDXContent = readMDXFile(path.join(contentPath, '/pages/resume.mdx'));
      return {
        ...parseMDX(careerMDXContent, true),
      }
    }),
});
