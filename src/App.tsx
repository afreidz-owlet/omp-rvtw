import cntl from "cntl";
import { useState, createContext, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Nav from "./components/Nav";
import Owl from "./components/Owl";
import Search from "./components/Search";
import DarkToggle from "./components/DarkToggle";

interface ISearchContext {
  placeholder?: string;
  callback?: () => void;
}

interface IDarkModeContext {
  dark?: boolean;
  toggle?: () => void;
}

export const DarkModeContext = createContext<IDarkModeContext>({});
export const SearchContext = createContext<ISearchContext | null>({
  placeholder: "Search",
});

function App() {
  const location = useLocation();
  const [darkEnabled, setDarkEnabled] = useState(false);
  const darkModeContextValue = { dark: darkEnabled, toggle: toggleDarkMode };
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

  function toggleDarkMode() {
    setDarkEnabled(!darkEnabled);
  }

  const classes = {
    app: (dark: boolean) => cntl`
      font-sans
      antialiased
      ${dark ? "dark" : "light"} 
    `,
    main: cntl`
      flex
      h-screen
      ease-in-out
      duration-200
      bg-neutral-200
      transition-colors
      dark:bg-secondary-blue-900
    `,
    nav: cntl`
      w-20
      lg:w-60
      border-r
      flex-none
      text-white
      ease-in-out
      duration-200
      transition-colors
      bg-secondary-blue-900
      dark:border-neutral-0/10
      border-secondary-blue-900
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
      px-4
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
    <DarkModeContext.Provider value={darkModeContextValue}>
      <SearchContext.Provider value={searchContext}>
        <span className="relative m-0 flex justify-center border border-primary-orange-type p-2 align-bottom text-white transition-colors duration-200 ease-in-out lg:hidden focus:outline-none border-b-primary-green-type after:w-10" />
        <div id="app" className={classes.app(darkEnabled)}>
          <main className={classes.main}>
            <nav className={classes.nav}>
              <figure className={classes.logo}>
                <Owl className="h-9" />
              </figure>
              <h1 className="p-4 text-center text-sm uppercase opacity-50">
                <span className="lg:hidden">OMP</span>
                <span className="hidden lg:inline">Management Portal</span>
              </h1>
              <Nav />
            </nav>
            <section className="flex grow flex-col dark:text-white">
              <header className={classes.header}>
                <Search className="grow place-self-stretch" />
                <div className="w-16 flex-none">
                  <DarkToggle />
                </div>
              </header>
              <div className="p-8">
                <Routes>
                  <Route
                    path="/"
                    element={<Navigate replace={true} to="/devices" />}
                  />
                  <Route path="/devices" element={<h2>Devices</h2>} />
                  <Route path="/accounts" element={<h2>Accounts</h2>} />
                  <Route path="/employees" element={<h2>Employees</h2>} />
                  <Route
                    path="/manufacturing"
                    element={<h2>Manufacturing</h2>}
                  />
                </Routes>
              </div>
            </section>
          </main>
        </div>
      </SearchContext.Provider>
    </DarkModeContext.Provider>
  );
}

export default App;
