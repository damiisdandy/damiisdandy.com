"use client";

import { useQuery } from "@tanstack/react-query";
import { Github, Star } from "lucide-react";

type Repository = {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
};

const fetchRepositories = async (repos: string[]) => {
  const reposPromises = repos.map((repo) =>
    fetch(`https://api.github.com/repos/damiisdandy/${repo}`).then(
      (res) => res.json() as Promise<Repository>,
    ),
  );
  return Promise.all(reposPromises);
};

type Props = {
  repos: string[];
};

const RepostoryCard = ({ repo }: { repo: Repository }) => {
  return (
    <div className="rounded-md bg-neutral-800 p-5">
      <p className="flex items-center gap-2 text-sm text-neutral-400">
        <span>
          <Github size={15} />
        </span>
        {repo.full_name}
      </p>
      <p className="mt-2 text-white">{repo.name}</p>
      <p className="mt-1 truncate text-sm text-neutral-400">
        {repo.description}
      </p>
      <div className="mt-5 flex items-center justify-between">
        <p className="mt-2 flex items-center gap-1.5 text-sm text-neutral-400">
          <Star size={15} />
          {repo.stargazers_count.toLocaleString()}
        </p>
        <a
          href={repo.html_url}
          target="_blank"
          className="rounded-[5px] bg-yellow-500 px-3 py-1 text-sm font-semibold text-stone-800"
        >
          Learn more
        </a>
      </div>
    </div>
  );
};

export default function Repositories({ repos }: Props) {
  const { data, error } = useQuery({
    queryKey: ["repositories"],
    queryFn: () => fetchRepositories(repos),
  });

  if (error) return <div>Error!</div>;

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {!data && !error ? (
        <>
          <div className="h-44 animate-pulse rounded-md bg-neutral-800"></div>
          <div className="h-44 animate-pulse rounded-md bg-neutral-800"></div>
          <div className="h-44 animate-pulse rounded-md bg-neutral-800"></div>
          <div className="h-44 animate-pulse rounded-md bg-neutral-800"></div>
        </>
      ) : (
        data?.map((repo) => <RepostoryCard key={repo.id} repo={repo} />)
      )}
    </div>
  );
}
