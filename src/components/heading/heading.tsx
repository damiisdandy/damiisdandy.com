"use client";

import { type ReactNode } from "react";
import clsx from "clsx";

export default function Heading({
  children,
  noMargin,
}: {
  children: ReactNode;
  noMargin?: boolean;
}) {
  return (
    <h1
      className={clsx("font-ibm text-3xl font-bold text-neutral-50", {
        "mb-3": !noMargin,
      })}
    >
      {children}
    </h1>
  );
}
