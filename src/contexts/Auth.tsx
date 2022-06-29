import { initializeApp } from "firebase/app";
import { useNavigate } from "react-router-dom";
import { getAuth, User, signOut, deleteUser } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";

import cache from "../cache";
import { useNotifications } from "./Notifications";

export interface IAuthContext {
  loading?: boolean;
  user?: User | null;
  signin?: () => void;
  signout?: () => void;
}

export const AuthContext = createContext<IAuthContext | undefined>({
  loading: false,
  user: undefined,
});

export default function Provider({ children }: { children: JSX.Element }) {
  const notify = useNotifications();
  const tenMinutes = (1000 * 60) * 10;
  const [timer, setTimer] = useState<any>();
  const [loading, setLoading] = useState(false);
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

  const navigate = useNavigate();
  const auth = cache.get("FBAUTH");
  const [signin] = useSignInWithGoogle(auth);
  const [userState, loadingState, errorState] = useAuthState(auth);

  function signout() {
    return signOut(cache.get("FBAUTH"));
  }

  function signoutWhenIdle() {
    clearTimeout(timer);
    setTimer(undefined);
    if (document.visibilityState === "hidden") {
      const newTimer = setTimeout(() => signout(), tenMinutes);
      setTimer(newTimer);
    }
  }

  useEffect(() => {
    if (
      userState &&
      !cache.get("ALLOWLIST").some((d: string) => userState?.email?.endsWith(d))
    ) {
      notify?.("your domain is not allowed to access this app");
      deleteUser(userState);
      setUser(null);
      navigate("/");
    } else {
      setUser(userState);
      navigate("/devices");
      document.addEventListener("visibilitychange", signoutWhenIdle);
    }
    return () => document.removeEventListener("visibilitychange", signoutWhenIdle);
  }, [userState, notify, timer]);

  useEffect(() => {
    setLoading(loadingState);
  }, [loadingState]);

  useEffect(() => {
    if (errorState) {
      notify?.(errorState.message);
    }
  }, [errorState]);

  return (
    <AuthContext.Provider value={{ user, signin, loading, signout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
