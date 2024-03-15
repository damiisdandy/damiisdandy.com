"use client";

import Link from "next/link";
import clsx from "clsx";

const LINKS: { name: string; url: string }[] = [
  {
    name: "home",
    url: "/",
  },
  {
    name: "career",
    url: "/career",
  },
  {
    name: "blog",
    url: "/blog",
  },
  {
    name: "projects",
    url: "/projects",
  },
  {
    name: "contact",
    url: "/#contact",
  },
];

export default function Navbar() {
  const isActive = (href: string) => href === window?.location?.pathname;

  return (
    <nav className="my-12 flex items-center gap-4">
      {LINKS.map((link) => (
        <Link
          className={clsx({
            "text-neutral-50": isActive(link.url),
            "text-neutral-300": !isActive(link.url),
          })}
          key={link.name}
          href={link.url}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
}
