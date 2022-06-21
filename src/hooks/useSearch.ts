import { useContext } from "react";
import { SearchContext } from "../contexts/Search";

export default function useSearch() {
  return useContext(SearchContext)
}
