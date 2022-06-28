import { Auth } from "firebase/auth";
import { FirebaseApp } from "firebase/app";

type AllowList = string[];

export interface ICache<Props extends object>
  extends Map<keyof Props, Props[keyof Props]> {
  get<K extends keyof Props>(key: K): Props[K];
  has: (key: keyof Props) => boolean;
}

const cache: ICache<{
  FBAUTH: Auth;
  FBAPP: FirebaseApp;
  ALLOWLIST: AllowList;
}> = new Map();

cache.set("ALLOWLIST", ["owletcare.com"]);

export default cache;
