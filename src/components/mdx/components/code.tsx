import type { CSSProperties, DetailedHTMLProps, HTMLAttributes } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import style from "react-syntax-highlighter/dist/esm/styles/hljs/gruvbox-dark";
import clsx from "clsx";

const inlineStyle: CSSProperties = {
  display: "inline",
  padding: "2px 8px",
  borderRadius: "4px",
};

export default function Code({
  children,
  className,
}: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) {
  const language = (className ?? "").split("-").pop();
  const isInline = !language;
  return (
    <span
      className={clsx("my-4 block overflow-hidden rounded-md", {
        "m-0 inline w-min": isInline,
      })}
    >
      <SyntaxHighlighter
        PreTag={isInline ? "code" : "pre"}
        customStyle={isInline ? inlineStyle : {}}
        language={language}
        style={style}
      >
        {children?.toString() ?? ""}
      </SyntaxHighlighter>
    </span>
  );
}
