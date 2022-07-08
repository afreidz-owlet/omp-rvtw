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

async function signin(callback: VoidFunction) {
  await signInWithPopup(auth, provider);
  callback();
}

async function signOut(callback: VoidFunction) {
  await fbSignOut(auth);
  callback();
}

function onAuthChange(callback: (user: User | null) => void) {
  onAuthStateChanged(auth, (user) => callback(user));
}

export { signin, onAuthChange, signOut, deleteUser };
