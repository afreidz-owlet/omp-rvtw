import { useContext } from "react";
import { DarkModeContext } from "../contexts/DarkMode";

export default function useDarkMode() {
  return useContext(DarkModeContext)
}
