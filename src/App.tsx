import cntl from "cntl";
import { Routes, Route, Navigate } from "react-router-dom";

import Nav from "./components/Nav";
import Menu from "./components/Menu";
import Search from "./components/Search";
import useDarkMode from "./hooks/useDarkMode";
import DarkToggle from "./components/DarkToggle";

function App() {
  const darkMode = useDarkMode();
  const classes = {
    app: (dark: boolean) => cntl`
      flex
      grow
      flex-col
      font-sans
      rounded-lg
      antialiased
      overflow-hidden
      ${dark ? "dark" : "light"} 
    `,
    main: cntl`
      flex
      grow
      ease-in-out
      duration-200
      bg-neutral-200
      transition-colors
      dark:bg-secondary-blue-900
    `,
    nav: cntl`
      w-20
      hidden
      lg:w-60
      sm:block
      border-r
      flex-none
      text-white
      ease-in-out
      duration-200
      bg-neutral-900
      transition-colors
      dark:border-neutral-0/10
      border-secondary-blue-900
      dark:bg-secondary-blue-900
    `,
    logo: cntl`
      grid
      h-14
      w-20
      lg:w-60
      border-b
      border-r
      flex-none
      text-white
      ease-in-out
      duration-200
      transition-colors
      place-items-center
      bg-primary-green-800
      border-primary-green-type
      dark:border-neutral-1000/80
      dark:bg-secondary-purple-800
    `,
    header: cntl`
      flex
      h-14
      flex-row
      border-b
      bg-white
      flex-none
      text-black
      ease-in-out
      duration-200
      items-center
      dark:text-white
      transition-colors
      border-neutral-1000/30
      dark:border-neutral-0/10
      dark:bg-secondary-blue-900
    `,
  };

  return (
    <div id="app" className={classes.app(darkMode.enabled)}>
      <header className={classes.header}>
        <figure className={classes.logo}>
          <Menu />
        </figure>
        <Search className="ml-4 grow place-self-stretch" />
        <div className="mr-4 w-16 flex-none">
          <DarkToggle />
        </div>
      </header>
      <main className={classes.main}>
        <nav className={classes.nav}>
          <h1 className="p-4 text-center text-sm uppercase opacity-50">
            <span className="lg:hidden">OMP</span>
            <span className="hidden lg:inline">Management Portal</span>
          </h1>
          <Nav />
        </nav>
        <section className="flex grow flex-col p-8 dark:text-white">
          <Routes>
            <Route
              path="/"
              element={<Navigate replace={true} to="/devices" />}
            />
            <Route path="/devices" element={<h2>Devices</h2>} />
            <Route path="/accounts" element={<h2>Accounts</h2>} />
            <Route path="/employees" element={<h2>Employees</h2>} />
            <Route path="/manufacturing" element={<h2>Manufacturing</h2>} />
          </Routes>
        </section>
      </main>
    </div>
  );
}

export default App;
