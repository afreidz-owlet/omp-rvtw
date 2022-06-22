import { useLocation } from "react-router-dom";
import { createContext, useState, useEffect, useContext } from "react";

interface ISearchContext {
  placeholder?: string;
  callback?: () => void;
}

export const SearchContext = createContext<ISearchContext | null>({
  placeholder: "Search",
});

export default function Provider({ children }: { children: JSX.Element }) {
  const location = useLocation();
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

  return (
    <SearchContext.Provider value={searchContext}>
      {children}
    </SearchContext.Provider>
  );
}

export const useSearch = () => useContext(SearchContext);
