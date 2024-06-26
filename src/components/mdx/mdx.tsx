import { MDXRemote } from "next-mdx-remote/rsc";
import { type ComponentProps } from "react";
import Link from "./components/link";
import createHeading from "./components/heading";
import { UnorderedList, ListItem } from "./components/list";
import HR from "./components/hr";
import Badge from "../badge/badge";
import Img from "./components/img";
import Code from "./components/code";
import BlockQuote from "./components/block-quote";
import Deprecated from "./components/deprecated";

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
  img: Img,
  a: Link,
  ul: UnorderedList,
  li: ListItem,
  Divider: HR,
  Badge,
  code: Code,
  Deprecated: Deprecated,
  blockquote: BlockQuote,
};

export default async function CustomMDX({ source, components }: MDXProps) {
  return (
    <div className="mdx">
      <MDXRemote
        source={source}
        components={{
          ...DEFAULT_COMPONENTS,
          ...components,
        }}
      />
    </div>
  );
}
