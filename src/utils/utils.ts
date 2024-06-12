import { type Metadata } from "next";
import { api } from "~/trpc/server";


export function getBaseUrl() {
  if (process.env.BASE_URL) return `https://${process.env.BASE_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export type BlogBySlugProps = {
  params: {
    slug: string;
  };
};

export const generatePostSEOMetadata = async (
  args: BlogBySlugProps,
): Promise<Metadata | undefined> => {
  const { metadata } = await api.markdown.getBlogBySlug(args.params.slug);

  if (!metadata) return;

  const { title, summary, publishedAt, image, type } = metadata;

  const urlDir = type === "post" ? "blog" : "projects";

  const ogImage = `${getBaseUrl()}${image ?? `/og?title=${title}`}`;

  console.log({
    image,
    ogImage,
  });

  return {
    title,
    description: summary,
    openGraph: {
      title,
      authors: "Damilola Jerugba",
      description: summary,
      type: "article",
      publishedTime: publishedAt,
      url: `${getBaseUrl()}/${urlDir}/${args.params.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: summary,
      images: [ogImage],
    },
  };
};
