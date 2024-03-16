import Badge from "~/components/badge/badge";
import Heading from "~/components/heading/heading";
import RedditLogo from "~/assets/icons/reddit.png";
import ArrowIcon from "~/icons/arrowIcon";
import Link from "~/components/link/link";
import { RESUME } from "~/constants";
import CustomMDX from "~/components/mdx/mdx";
import { api } from "~/trpc/server";

const experienceCount = new Date().getFullYear() - 2020;

export default async function Career() {
  const { source } = await api.markdown.careerPage();

  return (
    <div>
      <Heading>My Career</Heading>
      <p>
        I am a software developer with {experienceCount}+ years of experience,
        having worked with startups and larger tech companies like{" "}
        <Badge icon={RedditLogo}>Reddit</Badge>. I hold a first-class Mechanical
        Engineering degree and am passionate about learning and building.
      </p>
      <span className="mt-2 flex items-center gap-3 text-sm text-neutral-400">
        <ArrowIcon />
        <Link href={RESUME}>My resume</Link>
      </span>
      <hr className="my-8 border-neutral-500" />

      <CustomMDX source={source} />
    </div>
  );
}
