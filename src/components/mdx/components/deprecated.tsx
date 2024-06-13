import { type DetailedHTMLProps, type HTMLAttributes } from "react";

export default function Deprecated({
  children,
}: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) {
  return <div>{children}</div>;
}
