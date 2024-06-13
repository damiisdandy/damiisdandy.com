import Badge from "~/components/badge/badge";
import EmojiWrapper from "~/components/emoji-wrapper/emoji-wrapper";
import Link from "~/components/link/link";
import { RepositoryCard } from "~/components/repositories/respositories";
import GolangLogo from "~/assets/icons/golang.png";
import PythonLogo from "~/assets/icons/python.png";
import TypescriptLogo from "~/assets/icons/typescript.png";
import myPicture from "~/assets/me.jpg";
import ArrowIcon from "~/icons/arrowIcon";
import { CALENDLY, EMAIL, TWITTER } from "~/constants";
import Spotify from "~/components/spotify/spotify";
import Heading from "~/components/heading/heading";
import Image from "next/image";
import { api } from "~/trpc/server";
import BlogItem from "~/components/blog-item/blog-item";

const CONTACT_LINKS: { description: string; url: string }[] = [
  {
    description: EMAIL,
    url: `mailto:${EMAIL}`,
  },
  {
    description: "Book a meeting",
    url: CALENDLY,
  },
  {
    description: "Follow me",
    url: TWITTER,
  },
];
const FEATURED_REPOS = [
  "use-pagination",
  "linux-pretty-tree",
  "playlist-converter-api",
  "snake-game",
];

export default async function Home() {
  const blogs = await api.markdown.getBlogs({ limit: 3 });
  return (
    <main>
      <header className="mb-4 flex flex-col items-center justify-between gap-12 md:mb-12 md:flex-row">
        <div className="order-2 md:order-1">
          <Heading noMargin>Damilola Jerugba</Heading>
          <h2 className="mb-3 text-neutral-400">
            Software Developer{" "}
            <EmojiWrapper ariaLabel="high voltage">⚡</EmojiWrapper>
          </h2>
          <article>
            I am a software developer with a bachelor&apos;s degree in
            Engineering. I mostly write{" "}
            <Badge icon={TypescriptLogo}>Typescript</Badge>,{" "}
            <Badge icon={PythonLogo}>Python</Badge>, and{" "}
            <Badge icon={GolangLogo}>Go</Badge>. I have a proven track record of
            building scalable applications at both startups and large tech
            companies.
          </article>
        </div>
        <Image
          width={200}
          height={200}
          src={myPicture}
          alt="Damilola Jerugba in Native wear"
          className="order-1 w-48 rounded-full border-2 border-neutral-500 p-1 md:order-2"
        />
      </header>
      <article className="mb-4">
        Through my writing, I share my experiences and knowledge as a developer.
        one of my article on React was awarded as the best article of the week
        on <Link href="https://dev.to/damiisdandy">Dev.to</Link>. You can read
        my articles on my <Link href="/blog">blog</Link>.
      </article>

      <article className="mb-4">
        I am the Co-founder and CTO of{" "}
        <Link href="https://www.jetronticket.com">Jetron Ticket</Link>, We
        handle the ticketing system for events, both online and offline for
        event planners across West Africa.
      </article>

      <article className="mb-4">
        As a freelance developer / consultant, I have worked on personal
        projects and with clients from small businesses, celebrities to big
        companies. Some of my works are listed below, for more information,
        checkout <Link href="/projects">projects</Link>.
      </article>

      <section id="contact" className="mt-12">
        <Heading>Contact me</Heading>
        <div className="flex flex-col gap-3">
          {CONTACT_LINKS.map((link) => (
            <span
              key={link.url}
              className="flex items-center gap-3 text-neutral-400"
            >
              <ArrowIcon />
              <Link href={link.url} isExternal>
                {link.description}
              </Link>
            </span>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <Heading>What I&apos;m listening to</Heading>
        <Spotify />
      </section>

      <section className="mt-12">
        <Heading>Recent Blogs</Heading>
        <div className="space-y-10">
          {blogs.map((blog) => (
            <BlogItem key={blog.slug} {...blog} />
          ))}
        </div>
      </section>

      <section className="mt-12">
        <Heading>Featured Repos</Heading>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {FEATURED_REPOS.map((repo) => (
            <RepositoryCard key={repo} name={repo} />
          ))}
        </div>
      </section>
    </main>
  );
}
