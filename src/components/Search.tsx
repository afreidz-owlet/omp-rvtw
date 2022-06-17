import cntl from "cntl";
import { SearchIcon } from "@heroicons/react/outline";
import { useEffect, useRef, useContext, useState } from "react";

import { SearchContext } from "../App";

interface Props {
  className?: string;
}

export default function Search({ className }: Props) {
  const searchContext = useContext(SearchContext);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [placeholder, setPlaceholder] = useState(searchContext?.placeholder);

  const inputClasses = cntl`
    mr-4
    grow
    bg-white
    place-self-stretch
    focus:outline-none
    dark:bg-transparent
  `

  useEffect(() => {
    setPlaceholder(searchContext?.placeholder);
    searchInputRef.current && searchInputRef.current.focus();
  }, [searchContext]);

  if (!placeholder) return <div className={className}/>;

  return (
    <label className={`${className} flex items-center`}>
      <SearchIcon className="mr-4 w-5 flex-none opacity-50" />
      <input
        ref={searchInputRef}
        className={inputClasses}
        placeholder={placeholder}
      />
    </label>
  );
}
