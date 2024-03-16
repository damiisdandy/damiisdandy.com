"use client";

import { type ReactNode } from "react";
import clsx from "clsx";
import { IBM_Plex_Sans } from "next/font/google";

const IBMPlexSans = IBM_Plex_Sans({ weight: ["600"], subsets: ["latin"] });

export default function Heading({
  children,
  noMargin,
}: {
  children: ReactNode;
  noMargin?: boolean;
}) {
  return (
    <h1
      className={clsx(
        IBMPlexSans.className,
        "text-2xl font-bold text-neutral-50",
        {
          "mb-3": !noMargin,
        },
      )}
    >
      {children}
    </h1>
  );
}
