"use client";

import Link from "next/link";

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
  return (
    <nav className="my-12 flex items-center gap-4 md:gap-6">
      {LINKS.map((link) => (
        <Link
          className="text-neutral-300 hover:text-neutral-50"
          key={link.name}
          href={link.url}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
}
