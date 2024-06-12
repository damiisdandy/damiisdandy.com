"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

type SearchBarProps = {
  placeholder: string;
};
export default function SearchBar({ placeholder }: SearchBarProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = async (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    router.replace(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="flex h-11 items-center gap-2 overflow-hidden rounded-md bg-neutral-950 p-2 text-neutral-200">
      <Search size={16} />
      <input
        type="text"
        className="h-full w-full rounded-md border-none bg-transparent text-sm outline-none focus:outline-none"
        placeholder={placeholder}
        defaultValue={searchParams.get("query")?.toString()}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
}
