import { GITHUB, TWITTER } from "~/constants";
import ArrowIcon from "~/icons/arrowIcon";

const getYear = () => new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="text-sm text-neutral-500">
      <hr className="mt-12 border-neutral-500" />
      <div className="mt-2 flex flex-col justify-between md:flex-row md:items-center">
        <p className="flex items-center gap-2">
          <ArrowIcon className="inline" />{" "}
          <span>
            Follow me on{" "}
            <a className="underline" target="_blank" href={TWITTER}>
              Twitter
            </a>{" "}
            and{" "}
            <a className="underline" target="_blank" href={GITHUB}>
              Github
            </a>
          </span>
        </p>
        <p>&copy; damiisdandy {getYear()}</p>
      </div>
    </footer>
  );
}
