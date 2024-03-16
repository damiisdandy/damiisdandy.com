import { MDXRemote } from "next-mdx-remote/rsc";
import { type ComponentProps } from "react";
import Link from "./components/link";
import createHeading from "./components/heading";

type MDXComponents = ComponentProps<typeof MDXRemote>["components"];
type MDXSource = ComponentProps<typeof MDXRemote>["source"];

type MDXProps = {
  source: MDXSource;
  components?: MDXComponents;
};

const DEFAULT_COMPONENTS: MDXComponents = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  a: Link,
};

export default async function CustomMDX({ source, components }: MDXProps) {
  return (
    <MDXRemote
      source={source}
      components={{
        ...DEFAULT_COMPONENTS,
        ...components,
      }}
    />
  );
}
