import Image from "next/image";
import { type DetailedHTMLProps, type ImgHTMLAttributes } from "react";

export default function Img(
  props: DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >,
) {
  return (
    <Image
      src={props.src ?? ""}
      alt={props.alt ?? ""}
      width={700}
      height={700}
      className="my-4 w-full rounded-md"
    />
  );
}
