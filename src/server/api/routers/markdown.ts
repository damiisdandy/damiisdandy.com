import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  type Metadata,
  getAllFilesInDir,
  parseMDX,
  readMDXFile,
} from "~/server/parser/parser";
import { z } from "zod";

const getContentInput = z.object({
  query: z.string().optional(),
  limit: z.number().optional(),
  type: z.enum(["all", "project", "blog"]),
});

const getContentBySlugInput = z.object({
  slug: z.string(),
  type: z.enum(["project", "blog"]),
});

export const markdownRouter = createTRPCRouter({
  careerPage: publicProcedure.query(async () => {
    const careerMDXContent = await readMDXFile("/pages/resume.mdx");
    return {
      ...parseMDX(careerMDXContent, true),
    };
  }),
  getAllContentByType: publicProcedure
    .input(getContentInput)
    .query(async ({ input: { limit, type } }) => {
      const gatherContent = async (type: "blog" | "project") => {
        const files = getAllFilesInDir(`/${type}s`);
        const blogMDXContent = files.map(async (file) => {
          const fileName = file
            .split("/")
            .slice(-2)
            .join("/")
            .replace(`${type}s/`, "");
          const content = await readMDXFile(`/${type}s/${fileName}`);
          const { metadata } = parseMDX(content);
          return {
            ...metadata,
            slug: fileName.replace(".mdx", ""),
            tags: metadata.tags.split(",").map((tag) => tag.trim()),
            viewCount: 0,
          };
        });
        return await Promise.all(blogMDXContent);
      };
      if (type === "all") {
        const projects = await gatherContent("project");
        const blogs = await gatherContent("blog");
        return [...projects, ...blogs]
          .filter((item) => !item.draft)
          .sort(
            (a, b) =>
              new Date(b.publishedAt).getTime() -
              new Date(a.publishedAt).getTime(),
          )
          .slice(0, limit);
      }

      const content = await gatherContent(type);
      return content
        .filter((item) => !item.draft)
        .sort(
          (a, b) =>
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime(),
        )
        .slice(0, limit);
    }),
  getContentBySlug: publicProcedure
    .input(getContentBySlugInput)
    .query(async ({ input }) => {
      const gitHubURL =
        "https://github.com/damiisdandy/damiisdandy.com/blob/main/";
      const filePath = `/${input.type}s/${input.slug}.mdx`;
      const gitHubPage = `src/content/${filePath}`;
      try {
        const MDXContent = await readMDXFile(filePath);
        const { metadata, source } = parseMDX(MDXContent);
        return {
          metadata: {
            ...metadata,
            tags: metadata.tags.split(",").map((tag) => tag.trim()),
            viewCount: 0,
            gitHubPage: gitHubURL + gitHubPage,
          },
          source,
          notFound: false,
        };
      } catch (e) {
        const defaultMetadata: Metadata = {
          publishedAt: new Date().toString(),
          summary: "not found",
          tags: "",
          title: "Not Found",
          type: input.type,
          viewCount: 0,
        };
        return {
          notFound: true,
          metadata: {
            ...defaultMetadata,
            tags: [],
            gitHubPage: "",
          },
          source: "not found",
        };
      }
    }),
});
