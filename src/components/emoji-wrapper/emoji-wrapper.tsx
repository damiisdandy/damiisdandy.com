type EmojiWrapperProps = {
  children: React.ReactNode;
  ariaLabel: string;
};

export default function EmojiWrapper({
  children,
  ariaLabel,
}: EmojiWrapperProps) {
  return (
    <span role="img" aria-label={ariaLabel}>
      {children}
    </span>
  );
}
