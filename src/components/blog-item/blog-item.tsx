import { formatDate } from "~/utils/utils";
import Link from "~/components/link/link";
import Badge from "~/components/badge/badge";

type BlogItemProps = {
  slug: string;
  title: string;
  publishedAt: string;
  tags: string[];
  isProject?: boolean;
};

export default function BlogItem({
  slug,
  title,
  publishedAt,
  tags,
  isProject,
}: BlogItemProps) {
  return (
    <div>
      <Link href={`/${isProject ? "projects" : "blog"}/${slug}`}>{title}</Link>
      <p className="text-sm text-neutral-400">
        Created on {formatDate(new Date(publishedAt))}
      </p>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        {isProject && <Badge>Project</Badge>}
        {tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>
    </div>
  );
}
