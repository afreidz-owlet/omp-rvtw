import {
  Auth,
  signOut,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import auth from "../auth";

vi.mock("../index", () => {
  const cache = new Map();
  cache.set("FBAUTH", "bar");
  return { default: cache };
});

vi.mock("firebase/auth", async () => {
  const real = await vi.importActual<typeof import("firebase/auth")>(
    "firebase/auth"
  );
  return {
    ...real,
    signOut: vi.fn(() => Promise.resolve(true)),
    signInWithPopup: vi.fn(() => Promise.resolve(true)),
    onAuthStateChanged: vi.fn((_: Auth, cb: (u: boolean) => void) => cb(true)),
  };
});

describe("Authentication Adapter", () => {
  it("should handle signin", async () => {
    const mockCallback = vi.fn();
    await auth.signin(mockCallback);
    expect(signInWithPopup).toHaveBeenCalledOnce();
    expect(mockCallback).toHaveBeenCalledOnce();
  });
  it("should handle signout", async () => {
    const mockCallback = vi.fn();
    await auth.signOut(mockCallback);
    expect(signOut).toHaveBeenCalledOnce();
    expect(mockCallback).toHaveBeenCalledOnce();
  });
  it("should handle auth changes", () => {
    const mockCallback = vi.fn();
    auth.onAuthChange(mockCallback);
    expect(onAuthStateChanged).toHaveBeenCalledWith("bar", mockCallback);
    expect(mockCallback).toHaveBeenCalledWith(true);
  });
});
