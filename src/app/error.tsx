"use client";

import Image from "next/image";
import { useEffect } from "react";
import { EMAIL } from "~/constants";
import errorImg from "~/assets/error.webp";
import posthog from "posthog-js";

export default function Error({ error }: { error: Error }) {
  useEffect(() => {
    posthog.capture("error", { property: error.message });
    console.error(error);
  }, [error]);

  return (
    <section>
      <h1 className="mb-5 text-lg font-bold">Something went wrong</h1>
      <p>
        How about you try again? or contact me (
        <a href={`mailto:${EMAIL}`} className="text-yellow-500 underline">
          {EMAIL}
        </a>
        )
      </p>
      <Image
        className="mt-6"
        src={errorImg}
        alt="Lost"
        width={400}
        height={300}
      />
    </section>
  );
}
