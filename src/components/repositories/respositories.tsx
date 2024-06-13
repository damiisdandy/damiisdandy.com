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

const fetchRepo = async (repo: string) => {
  return fetch(`https://api.github.com/repos/damiisdandy/${repo}`).then(
    (res) => res.json() as Promise<Partial<Repository>>,
  );
};

export const RepositoryCard = ({ name }: { name: string }) => {
  const { data, error } = useQuery({
    queryKey: ["repositories", name],
    queryFn: () => fetchRepo(name),
  });

  if (!data || error)
    return <div className="h-44 animate-pulse rounded-md bg-neutral-800"></div>;

  return (
    <div className="rounded-md bg-neutral-800 p-5">
      <p className="flex items-center gap-2 text-sm text-neutral-400">
        <span>
          <Github size={15} />
        </span>
        {data.full_name ?? "not-found"}
      </p>
      <p className="mt-2 text-white">{data.name}</p>
      <p className="mt-1 truncate text-sm text-neutral-400">
        {data.description ?? "problem fetching repo "}
      </p>
      <div className="mt-5 flex items-center justify-between">
        <p className="mt-2 flex items-center gap-1.5 text-sm text-neutral-400">
          <Star size={15} />
          {data?.stargazers_count?.toLocaleString() ?? "0"}
        </p>
        <a
          href={data.html_url}
          target="_blank"
          className="rounded-[5px] bg-yellow-500 px-3 py-1 text-sm font-semibold text-stone-800"
        >
          Learn more
        </a>
      </div>
    </div>
  );
};
