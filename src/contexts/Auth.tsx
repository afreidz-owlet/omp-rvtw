import { User } from "firebase/auth";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import adapters from "../adapters";
import { useNotifications } from "./Notifications";
import { signin, signOut, onAuthChange, deleteUser } from "../adapters/auth";

export interface IAuthContext {
  loading?: boolean;
  user?: User | null;
  signout?: () => void;
  authenticated?: boolean;
  signin?: (callback: VoidFunction) => Promise<void>;
}

export const AuthContext = createContext<IAuthContext>({
  user: null,
  loading: false,
  authenticated: false,
});

export default function Provider({ children }: { children: JSX.Element }) {
  const notify = useNotifications();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<User | undefined | null>();

  const signout = useCallback(() => {
    signOut(() => {
      setUser(null);
      setAuthenticated(false);
    });
  }, []);

  useEffect(() => {
    onAuthChange((user) => {
      if (
        user &&
        adapters.get("ALLOWLIST").some((d: string) => user?.email?.endsWith(d))
      ) {
        setUser(user);
        setLoading(false);
        setAuthenticated(true);
      } else if (user) {
        setUser(null);
        deleteUser(user);
        setLoading(false);
        setAuthenticated(false);
        notify?.("your domain is not allowed ot access this app");
      } else {
        setUser(null);
        setLoading(false);
        setAuthenticated(false);
      }
    });
  }, [notify]);

  useEffect(() => {
    if (authenticated && signout) {
      const idleTime = 60 * 1000 * 60; // 1hour
      let timer: ReturnType<typeof setTimeout>;
      function signOutWhenIdle() {
        clearTimeout(timer);
        if (document.visibilityState === "hidden") {
          timer = setTimeout(() => signout(), idleTime);
          return;
        }
      }
      document.addEventListener("visibilitychange", signOutWhenIdle);
      return () =>
        document.removeEventListener("visibilitychange", signOutWhenIdle);
    }
  }, [authenticated, signout]);

  return (
    <AuthContext.Provider
      value={{ user, signin, loading, signout, authenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
