import { IBM_Plex_Sans } from "next/font/google";
import Badge from "~/components/badge/badge";
import EmojiWrapper from "~/components/emoji-wrapper/emoji-wrapper";
import Link from "~/components/link/link";
import GolangLogo from "~/assets/icons/golang.png";
import PythonLogo from "~/assets/icons/python.png";
import TypescriptLogo from "~/assets/icons/typescript.png";
import ArrowIcon from "~/icons/arrowIcon";
import { CALENDLY, EMAIL, TWITTER } from "~/constants";
import { type ReactNode } from "react";
import clsx from "clsx";
import Spotify from "~/components/spotify/spotify";
const IBMPlexSans = IBM_Plex_Sans({ weight: ["600"], subsets: ["latin"] });

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

const Heading = ({
  children,
  noMargin,
}: {
  children: ReactNode;
  noMargin?: boolean;
}) => (
  <h1
    className={clsx(
      IBMPlexSans.className,
      "text-2xl font-bold text-neutral-50",
      {
        "mb-3": !noMargin,
      },
    )}
  >
    {children}
  </h1>
);

export default async function Home() {
  return (
    <main>
      <header className="mb-12">
        <Heading noMargin>Damilola Jerugba</Heading>
        <h2>
          Software Developer{" "}
          <EmojiWrapper ariaLabel="high voltage">⚡</EmojiWrapper>
        </h2>
      </header>
      <article className="mb-4">
        I am a software developer with a bachelor&apos;s degree in Engineering.
        I mostly write <Badge icon={TypescriptLogo}>Typescript</Badge>,{" "}
        <Badge icon={PythonLogo}>Python</Badge>, and{" "}
        <Badge icon={GolangLogo}>Go</Badge>. I love working at startups where my
        impact can be shown quickly, psst! but I also don&apos;t mind big tech
        (ex Reddit).
      </article>

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
    </main>
  );
}
