import { type ReactNode, createElement } from "react";
import slugify from "slugify";
import { IBM_Plex_Sans } from "next/font/google";

const IBMPlexSans = IBM_Plex_Sans({
  weight: ["500", "600"],
  subsets: ["latin"],
});

type CustomHeadingProps = {
  children: ReactNode;
  level: number;
};

const CustomHeading = ({ children, level }: CustomHeadingProps) => {
  const slug = slugify(children?.toString() ?? "", {
    lower: true,
    strict: true,
  });

  const levelToSize = [
    "text-4xl",
    "text-3xl",
    "text-2xl",
    "text-xl",
    "text-md",
  ];

  return createElement(
    `h${level}`,
    {
      id: slug,
      className: `${IBMPlexSans.className} ${levelToSize[level]} font-semibold my-2 text-neutral-50`,
    },
    [
      createElement(
        "a",
        {
          href: `#${slug}`,
          key: `link-${slug}`,
        },
        children,
      ),
    ],
  );
};

export default function createHeading(level: number) {
  // eslint-disable-next-line react/display-name
  return ({ children }: { children?: ReactNode }) => (
    <CustomHeading level={level}>{children}</CustomHeading>
  );
}
