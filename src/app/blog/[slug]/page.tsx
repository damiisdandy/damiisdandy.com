import CustomMDX from "~/components/mdx/mdx";
import { RepositoryCard } from "~/components/repositories/respositories";
import { api } from "~/trpc/server";
import {
  estimateReadingTime,
  generatePostSEOMetadata,
  type BlogBySlugProps,
} from "~/utils/utils";
import { IBM_Plex_Sans } from "next/font/google";
import dayjs from "dayjs";
import Badge from "~/components/badge/badge";
import Image from "next/image";

const IBMPlexSans = IBM_Plex_Sans({ weight: ["700"], subsets: ["latin"] });

export async function generateMetadata(args: BlogBySlugProps) {
  return generatePostSEOMetadata(args);
}

export default async function BlogBySlug(props: BlogBySlugProps) {
  const { metadata, source } = await api.markdown.getBlogBySlug(
    props.params.slug,
  );

  const { title, publishedAt, tags } = metadata;

  return (
    <div>
      <h1
        className={`${IBMPlexSans.className} text-3xl font-bold text-neutral-50`}
      >
        {title}
      </h1>
      <div className="md:text-md mt-3 flex items-center justify-between text-sm text-neutral-400">
        <span>{dayjs(publishedAt).format("MMMM D, YYYY")}</span>
        <span>{estimateReadingTime(source)} min read</span>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>
      {metadata.image && (
        <Image
          className="my-6 rounded-lg"
          src={metadata.image}
          alt={title}
          width={1200}
          height={630}
        />
      )}
      <div>
        <CustomMDX
          source={source}
          components={{
            RepositoryCard: ({ name }: { name: string }) => (
              <div className="mt-8">
                <RepositoryCard name={name} />
              </div>
            ),
          }}
        />
      </div>
    </div>
  );
}
