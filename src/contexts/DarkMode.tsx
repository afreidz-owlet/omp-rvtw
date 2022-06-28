import { createContext, useState, useContext } from "react";

interface IDarkModeContext {
  enabled: boolean;
  toggle?: () => void;
}

const DarkModeContext = createContext<IDarkModeContext>({
  enabled: false,
});

export default function DarkModeProvider({
  children,
}: {
  children: JSX.Element;
}) {
  const [enabled, setEnabled] = useState(false);

  function toggle() {
    setEnabled(!enabled);
  }

  return (
    <DarkModeContext.Provider value={{ enabled, toggle }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export const useDarkMode = () => useContext(DarkModeContext);
