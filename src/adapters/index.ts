import { Auth, getAuth } from "firebase/auth";
import { FirebaseApp, initializeApp } from "firebase/app";
import { Database, getDatabase } from "firebase/database";

type AllowList = string[];

export interface ICache<Props extends object>
  extends Map<keyof Props, Props[keyof Props]> {
  get<K extends keyof Props>(key: K): Props[K];
  has: (key: keyof Props) => boolean;
}

const cache: ICache<{
  FBAUTH: Auth;
  FBAPP: FirebaseApp;
  DATABASE: Database;
  ALLOWLIST: AllowList;
}> = new Map();

cache.set("ALLOWLIST", ["owletcare.com"]);

if (!cache.has("FBAPP")) {
  cache.set(
    "FBAPP",
    initializeApp({
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      databaseURL: import.meta.env.VITE_FIREBASE_DATABASE,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    })
  );
}

if (!cache.has("FBAUTH")) cache.set("FBAUTH", getAuth(cache.get("FBAPP")));
if (!cache.has("DATABASE")) cache.set("DATABASE", getDatabase(cache.get("FBAPP")));

export default cache;
