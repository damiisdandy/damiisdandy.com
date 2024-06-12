import { type DetailedHTMLProps, type HTMLAttributes } from "react";
import { highlight } from "sugar-high";

export default function Code({
  children,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) {
  const codeHTML = highlight(children as string);
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}
