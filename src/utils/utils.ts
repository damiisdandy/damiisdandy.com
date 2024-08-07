import { type Metadata } from "next";
import { api } from "~/trpc/server";

export function getBaseUrl() {
  if (process.env.BASE_URL) return `https://${process.env.BASE_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export type BlogBySlugProps = {
  params: {
    slug: string | string[];
  };
};

export const parseSlug = (str: string | string[]) => {
  return typeof str == "string" ? str : str.join("/");
};

export const generatePostSEOMetadata = async (
  args: BlogBySlugProps & { type: "blog" | "project" },
): Promise<Metadata> => {
  const slug = parseSlug(args.params.slug);
  const { metadata } = await api.markdown.getContentBySlug({
    slug,
    type: args.type,
  });

  if (!metadata) return {};

  const { title, summary, publishedAt, image, type } = metadata;

  const urlDir = type === "post" ? "blog" : "projects";

  const ogImage = `${getBaseUrl()}${image}`;

  return {
    title,
    description: summary,
    openGraph: {
      title,
      authors: "Damilola Jerugba",
      description: summary,
      type: "article",
      publishedTime: publishedAt,
      url: `${getBaseUrl()}/${urlDir}/${slug}`,
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

// Function to get the ordinal suffix for a given day
export const getOrdinalSuffix = (day: number) => {
  if (day > 3 && day < 21) return "th"; // special case for 11th-13th
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

// Function to format the date as "20th May 2023"
export const formatDate = (date: Date) => {
  const day = date.getDate();
  const monthFormatter = new Intl.DateTimeFormat("en-GB", { month: "long" });
  const year = date.getFullYear();

  const dayWithSuffix = `${day}${getOrdinalSuffix(day)}`;
  const month = monthFormatter.format(date);

  return `${dayWithSuffix} ${month} ${year}`;
};

// Function to estimate reading time in minutes
export const estimateReadingTime = (text: string) => {
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).filter((word) => word.length > 0).length;
  const readingTimeMinutes = wordCount / wordsPerMinute;
  return Math.ceil(readingTimeMinutes);
};
