import ArrowIcon from "~/icons/arrowIcon";

const getYear = () => new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="text-sm text-neutral-500">
      <hr className="border-neutral-500" />
      <div className="mt-2 flex items-center justify-between">
        <p className="flex items-center gap-2">
          <ArrowIcon className="inline" />{" "}
          <span>
            Follow me on{" "}
            <a
              className="underline"
              target="_blank"
              href="https://github.com/damiisdandy"
            >
              Github
            </a>{" "}
            and{" "}
            <a
              className="underline"
              target="_blank"
              href="https://twitter.com/realdamiisdandy"
            >
              Twitter
            </a>
          </span>
        </p>
        <p>&copy; damiisdandy {getYear()}</p>
      </div>
    </footer>
  );
}
