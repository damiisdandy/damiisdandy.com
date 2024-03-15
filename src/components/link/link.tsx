"use client";
import NextLink from "next/link";

type LinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export default function Link(props: LinkProps) {
  const style = `relative text-neutral-50 after:content-[' '] after:width-full after:absolute after:-bottom-0.5 after:left-0 after:block after:h-0.5 after:w-full after:bg-neutral-500 ${props.className}`;

  if (props.href.startsWith("http")) {
    return <a className={style} {...props} />;
  } else {
    return <NextLink className={style} {...props} />;
  }
}
