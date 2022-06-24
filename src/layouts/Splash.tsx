import cntl from "cntl";
import { useDarkMode } from "../contexts/DarkMode";

export default function SplashLayout({ children }: { children?: JSX.Element }) {
  const darkMode = useDarkMode();
  const classes = {
    app: (dark: boolean) => cntl`
      grow
      flex
      font-sans
      rounded-lg
      antialiased
      ease-in-out
      items-center
      duration-400
      justify-center
      bg-neutral-200
      overflow-hidden
      transition-colors
      ${dark ? "dark" : "light"} 
      ${dark ? "bg-secondary-blue-900" : "bg-neutral-200"}
    `,
    main: cntl`
      grow
      flex
      flex-col
      h-screen
      sm:h-auto
      sm:grow-0
      rounded-lg
      drop-shadow-xl
      bg-primary-green-800
      dark:bg-secondary-purple-800
    `,
  };

  return (
    <div
      id="app"
      className={classes.app(darkMode.enabled)}
      role={`app-${darkMode.enabled ? "dark" : "light"}`}
    >
      <main className={classes.main}>
        {children}
      </main>
    </div>
  );
}
