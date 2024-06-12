import Heading from "~/components/heading/heading";
import Link from "~/components/link/link";
import SearchBar from "~/components/search-bar/search-bar";

export default function Blog() {
  return (
    <div>
      <Heading>Blog</Heading>
      <p>
        Here are a list of articles I&apos;ve written, they cover concepts in
        software development. I also document the projects I build and the
        lessons I learn from them. You can check them out at{" "}
        <Link href="/projects">projects</Link>.
      </p>
      <div className="mt-6">
        <SearchBar placeholder="search by name or tag" />
      </div>
    </div>
  );
}
