import CustomMDX from "~/components/mdx/mdx";
import { api } from "~/trpc/server";
import { generatePostSEOMetadata, type BlogBySlugProps } from "~/utils/utils";
import { IBM_Plex_Sans } from "next/font/google";
import dayjs from "dayjs";
import Badge from "~/components/badge/badge";

const IBMPlexSans = IBM_Plex_Sans({ weight: ["700"], subsets: ["latin"] });

export async function generateMetadata(args: BlogBySlugProps) {
  return generatePostSEOMetadata(args);
}

export default async function BlogBySlug(props: BlogBySlugProps) {
  const { metadata, source } = await api.markdown.getBlogBySlug(
    props.params.slug,
  );

  const { title, publishedAt, tags, viewCount } = metadata;

  return (
    <div>
      <h1
        className={`${IBMPlexSans.className} text-3xl font-bold text-neutral-50`}
      >
        {title}
      </h1>
      <div className="md:text-md mt-3 flex items-center justify-between text-sm text-neutral-400">
        <span>{dayjs(publishedAt).format("MMMM D, YYYY")}</span>
        <span>{viewCount.toLocaleString()} views</span>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>
      <div className="mt-7 md:mt-12">
        <CustomMDX source={source} />
      </div>
    </div>
  );
}
