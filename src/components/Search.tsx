import cntl from "cntl";
import { useEffect, useRef } from "react";
import { SearchIcon } from "@heroicons/react/outline";

import useSearch from "../hooks/useSearch";

export default function Search({ className }: { className: string }) {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContext = useSearch();

  const inputClasses = cntl`
    mr-4
    grow
    bg-white
    place-self-stretch
    focus:outline-none
    dark:bg-transparent
  `;

  useEffect(() => {
    searchInputRef.current && searchInputRef.current.focus();
  }, [searchContext]);

  if (!searchContext?.placeholder) return <div className={className} />;

  return (
    <label className={`${className} flex items-center`}>
      <SearchIcon className="mr-4 w-5 flex-none opacity-50" />
      <input
        ref={searchInputRef}
        className={inputClasses}
        placeholder={searchContext.placeholder}
      />
    </label>
  );
}
