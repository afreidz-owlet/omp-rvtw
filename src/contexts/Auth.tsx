import { initializeApp } from "firebase/app";
import { getAuth, User, signOut, deleteUser } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";

import cache from "../cache";
import { useNotifications } from "./Notifications";

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
  const [loading, setLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<User | undefined | null>();

  if (!cache.has("FBAPP")) {
    cache.set(
      "FBAPP",
      initializeApp({
        appId: import.meta.env.VITE_FIREBASE_APP_ID,
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      })
    );
  }

  if (cache.has("FBAPP") && !cache.get("FBAUTH")) {
    cache.set("FBAUTH", getAuth(cache.get("FBAPP")));
  }

  const auth = cache.get("FBAUTH");
  const [signIn] = useSignInWithGoogle(auth);
  const [userState, loadingState, errorState] = useAuthState(auth);

  function signout() {
    return signOut(cache.get("FBAUTH"));
  }

  async function signin(callback: VoidFunction) {
    await signIn();
    callback();
  }

  useEffect(() => {
    if (!userState) {
      setUser(null);
      setAuthenticated(false);
    } else if (
      !cache.get("ALLOWLIST").some((d: string) => userState?.email?.endsWith(d))
    ) {
      notify?.("your domain is not allowed to access this app");
      deleteUser(userState);
      setUser(null);
    } else {
      setUser(userState);
      setAuthenticated(true);
    }
  }, [userState, notify]);

  useEffect(() => {
    setLoading(loadingState);
  }, [loadingState]);

  useEffect(() => {
    if (errorState) {
      notify?.(errorState.message);
    }
  }, [errorState, notify]);

  useEffect(() => {
    if (authenticated) {
      const idleTime = 60 * 1000 * 60; // 1hour
      let timer: ReturnType<typeof setTimeout>;
      function signOutWhenIdle() {
        clearTimeout(timer);
        if (document.visibilityState === "hidden") {
          timer = setTimeout(() => signout(), idleTime);
        }
      }
      document.addEventListener("visibilitychange", signOutWhenIdle);
      return () =>
        document.removeEventListener("visibilitychange", signOutWhenIdle);
    }
  }, [authenticated]);

  return (
    <AuthContext.Provider
      value={{ user, signin, loading, signout, authenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
