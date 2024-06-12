"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

type SearchBarProps = {
  placeholder: string;
};
export default function SearchBar({ placeholder }: SearchBarProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = async (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    await replace(`${pathname}?${params.toString()}`);
  };
  return (
    <div>
      <input
        type="text"
        placeholder={placeholder}
        defaultValue={searchParams.get("query")?.toString()}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
}
