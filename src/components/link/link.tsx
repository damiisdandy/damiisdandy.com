"use client";
import NextLink from "next/link";

type LinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  isExternal?: boolean;
};

export default function Link(props: LinkProps) {
  const style = `relative text-neutral-50 after:content-[' '] after:width-full after:absolute after:-bottom-[1px] after:left-0 after:block after:h-0.5 after:w-full after:bg-neutral-500 ${props.className}`;

  if (props.href.startsWith("http") || props.isExternal) {
    return <a className={style} {...props} target="_blank" />;
  } else {
    return <NextLink className={style} {...props} />;
  }
}
