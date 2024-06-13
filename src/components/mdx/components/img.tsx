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
      width={600}
      height={600}
      className="my-6 w-full rounded-md"
    />
  );
}
