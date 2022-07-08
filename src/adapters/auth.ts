import adapters from "./";
import {
  User,
  deleteUser,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut as fbSignOut,
} from "firebase/auth";

const auth = adapters.get("FBAUTH");
const provider = new GoogleAuthProvider();

export async function signin(callback: VoidFunction) {
  await signInWithPopup(auth, provider);
  callback();
}

export async function signOut(callback: VoidFunction) {
  await fbSignOut(auth);
  callback();
}

export function onAuthChange(callback: (user: User | null) => void) {
  onAuthStateChanged(auth, callback);
}

export { deleteUser } from "firebase/auth";

export default { signin, onAuthChange, signOut, deleteUser };
