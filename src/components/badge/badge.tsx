"use client";

import Image, { type StaticImageData } from "next/image";

type BadgeProps = {
  children: React.ReactNode;
  icon?: StaticImageData;
  size?: number;
};

export default function Badge(props: BadgeProps) {
  const size = props.size ?? 12;
  return (
    <span className="inline-flex items-center gap-2 rounded-md border-[0.5px] border-neutral-700 bg-neutral-800 px-2 py-[1px] text-sm text-neutral-300">
      {props.icon && (
        <Image src={props.icon} alt="" width={size} height={size} />
      )}
      <span>{props.children}</span>
    </span>
  );
}
