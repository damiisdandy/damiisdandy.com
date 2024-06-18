"use client";
import NextLink from "next/link";

type LinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  isExternal?: boolean;
};

export default function Link({ isExternal, ...props }: LinkProps) {
  const style = ` ${props.className} hover:text-[#eee] underline decoration-neutral-500 decoration-2 underline-offset-[4.5px]`;
  if (props.href.startsWith("http") || isExternal) {
    return <a className={style} {...props} target="_blank" />;
  } else {
    return <NextLink className={style} {...props} />;
  }
}
