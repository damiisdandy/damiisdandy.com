import { type BlockquoteHTMLAttributes, type DetailedHTMLProps } from "react";

export default function BlockQuote({
  children,
}: DetailedHTMLProps<
  BlockquoteHTMLAttributes<HTMLQuoteElement>,
  HTMLQuoteElement
>) {
  return (
    <blockquote className="my-4 rounded-lg bg-neutral-800 p-3 italic">
      {children}
    </blockquote>
  );
}
