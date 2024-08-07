import CustomMDX from "~/components/mdx/mdx";
import { RepositoryCard } from "~/components/repositories/respositories";
import { api } from "~/trpc/server";
import {
  estimateReadingTime,
  generatePostSEOMetadata,
  parseSlug,
  type BlogBySlugProps,
} from "~/utils/utils";
import { IBM_Plex_Sans } from "next/font/google";
import dayjs from "dayjs";
import Badge from "~/components/badge/badge";
import Image from "next/image";
import { PLACE_HOLDER_IMAGE } from "~/constants";
import Link from "~/components/link/link";
import { Pen } from "lucide-react";

const IBMPlexSans = IBM_Plex_Sans({ weight: ["700"], subsets: ["latin"] });

export async function generateMetadata(args: BlogBySlugProps) {
  return generatePostSEOMetadata({ ...args, type: "project" });
}

export default async function ProjectBySlug(props: BlogBySlugProps) {
  const { metadata, source } = await api.markdown.getContentBySlug({
    slug: parseSlug(props.params.slug),
    type: "project",
  });

  const { title, publishedAt, tags, gitHubPage } = metadata;

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
      <div className="mb-6 mt-3 flex flex-wrap items-center gap-2">
        {tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>
      {metadata.image && (
        <Image
          className="mb-6 rounded-lg object-cover"
          src={metadata.image}
          blurDataURL={PLACE_HOLDER_IMAGE}
          placeholder="blur"
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

      <div className="mt-2 flex items-center justify-end gap-2">
        <Pen size={12} />
        <Link className="text-sm text-neutral-400 underline" href={gitHubPage}>
          Edit page on GitHub
        </Link>
      </div>
    </div>
  );
}
