import { type Metadata } from "next";
import Heading from "~/components/heading/heading";
import Link from "~/components/link/link";
import { GITHUB } from "~/constants";
import comingSoon from "~/assets/coming-soon.webp";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Projects",
  description: "What i've built",
};

export default function Projects() {
  return (
    <section>
      <Heading>Page under construction</Heading>
      <p>
        Have a look at my Github for now:{" "}
        <Link href={GITHUB}>@damiisdandy</Link>
      </p>
      <Image className="mt-6" src={comingSoon} alt="Coming soon" />
    </section>
  );
}
