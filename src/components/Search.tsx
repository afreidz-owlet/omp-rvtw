import cntl from "cntl";
import { useLocation } from "react-router-dom";
import { SearchIcon } from "@heroicons/react/outline";
import { useEffect, useRef, useState, createContext } from "react";

interface ISearchContext {
  placeholder?: string;
  callback?: () => void;
}

interface Props {
  className?: string;
}

export const SearchContext = createContext<ISearchContext | null>({
  placeholder: "Search",
});

export default function Search({ className }: Props) {
  const location = useLocation();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchContext, setSearchContext] = useState<ISearchContext | null>(
    null
  );

  useEffect(() => {
    switch (location.pathname) {
      case "/devices":
        setSearchContext({
          placeholder: "Search for Device by DSN",
        });
        break;
      case "/accounts":
        setSearchContext({
          placeholder: "Search for Account by Email, First Name, or Last Name",
        });
        break;
      case "/employees":
        setSearchContext({
          placeholder: "Search for Employee by Email, First Name, or Last Name",
        });
        break;
      default:
        setSearchContext(null);
        break;
    }
  }, [location]);

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
