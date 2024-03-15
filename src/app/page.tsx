import { IBM_Plex_Sans } from "next/font/google";
import EmojiWrapper from "~/components/emoji-wrapper/emoji-wrapper";
import Link from "~/components/link/link";

const IBMPlexSans = IBM_Plex_Sans({ weight: ["600"], subsets: ["latin"] });

export default async function Home() {
  return (
    <main>
      <header className="mb-12">
        <h1
          className={`${IBMPlexSans.className} text-2xl font-bold text-neutral-50`}
        >
          Damilola Jerugba
        </h1>
        <h2>
          Software Developer{" "}
          <EmojiWrapper ariaLabel="high voltage">⚡</EmojiWrapper>
        </h2>
      </header>
      <article className="mb-4">
        I am a software developer with a bachelor&apos;s degree in Engineering.
        I mostly write Javascript (Typescript), Python, and Go. I love working
        at startups where my impact can be shown quickly, psst! but I also
        don&apos;t mind big tech (ex Reddit).
      </article>

      <article className="mb-4">
        I am a writer and I love to write about software development. Through my
        writing, I share my experiences and knowledge as a developer. one of my
        article on React was awarded as the best article of the week on{" "}
        <Link href="https://dev.to/damiisdandy">Dev.to</Link>. You can read some
        of my articles on my <Link href="/blog">blog</Link>.
      </article>

      <article className="mb-4">
        I am the Co-founder and CTO of{" "}
        <Link href="https://www.jetronticket.com">Jetron Ticket</Link>, a
        platform where users can discover events happening around them and buy
        tickets to the events. We handle the ticketing system for events, both
        online and offline for event planners across West Africa.
      </article>

      <article className="mb-4">
        As a freelance developer / consultant, I have worked with clients from
        small businesses, celebrities to big companies. Some of my learning
        comes from these project since I can apply what I learn to the project.
        Some of my works are listed below, for more information, checkout{" "}
        <Link href="/projects">projects</Link>.
      </article>
    </main>
  );
}
