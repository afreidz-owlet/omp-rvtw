import { User } from "firebase/auth";
import { MockedFunction } from "vitest";
import { fireEvent, renderHook, createEvent } from "@testing-library/react";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";

const mockInit = vi.fn();
const mockNotify = vi.fn();
const mockCache = new Map();
const mockGetAuth = vi.fn();
const mockSignOut = vi.fn();
const mockNavigate = vi.fn();

import AuthContext, { useAuth } from "../../contexts/Auth";

const wrapper = ({ children }: { children: JSX.Element }) => (
  <AuthContext>{children}</AuthContext>
);

const mockUser: User = {
  uid: "1",
  metadata: {},
  providerId: "1",
  tenantId: "111",
  providerData: [],
  isAnonymous: false,
  toJSON: () => ({}),
  refreshToken: "111",
  emailVerified: true,
  email: "test@foo.com",
  displayName: "Test User",
  phoneNumber: "8888888888",
  reload: () => Promise.resolve(),
  delete: () => Promise.resolve(),
  photoURL: "https://test.com/photo",
  getIdToken: () => Promise.resolve("111"),
  getIdTokenResult: () =>
    Promise.resolve({
      claims: {},
      token: "111",
      authTime: "1",
      issuedAtTime: "1",
      expirationTime: "1",
      signInProvider: "test",
      signInSecondFactor: "test",
    }),
};

vi.mock("../../cache", () => ({ default: mockCache }));

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock("react-firebase-hooks/auth", () => ({
  useAuthState: vi.fn(),
  useSignInWithGoogle: vi.fn(),
}));

vi.mock("firebase/app", () => ({
  initializeApp: mockInit,
}));

vi.mock("firebase/auth", () => ({
  deleteUser: vi.fn(),
  getAuth: mockGetAuth,
  signOut: mockSignOut,
}));

vi.mock("../../contexts/Notifications", () => ({
  useNotifications: () => mockNotify,
}));

describe("Authentication Context", () => {
  (useSignInWithGoogle as MockedFunction<any>).mockReturnValue([vi.fn()]);

  mockCache.set("FBAPP", "test");
  mockCache.set("FBAUTH", "test");
  mockCache.set("ALLOWLIST", ["foo.com"]);

  it("Should have a default state", () => {
    (useAuthState as MockedFunction<any>).mockReturnValue([
      null,
      false,
      undefined,
    ]);

    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(mockInit).not.toHaveBeenCalled();
    expect(result.current?.user).toBeFalsy();
    expect(mockGetAuth).not.toHaveBeenCalled();
    expect(result.current?.loading).toBe(false);
  });

  it("Should handle authenticating a user", () => {
    (useAuthState as MockedFunction<any>).mockReturnValue([
      mockUser,
      false,
      undefined,
    ]);

    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(mockNavigate).toHaveBeenCalledWith("/devices");
    expect(result.current?.user?.displayName).toBe("Test User");
  });

  it("Should handle users from incorrect domains", () => {
    (useAuthState as MockedFunction<any>).mockReturnValue([
      { ...mockUser, email: "test@bad-domain.com" },
      false,
      undefined,
    ]);

    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current?.user).toBeFalsy();
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("should set cache values if they don't exist", () => {
    (useAuthState as MockedFunction<any>).mockReturnValue([
      mockUser,
      false,
      undefined,
    ]);
    mockCache.delete("FBAPP");
    mockCache.delete("FBAUTH");
    renderHook(() => useAuth(), { wrapper });
    expect(mockInit).toHaveBeenCalled();
    expect(mockGetAuth).toHaveBeenCalled();
  });

  it("should handle sign out", () => {
    (useAuthState as MockedFunction<any>).mockReturnValue([
      mockUser,
      false,
      undefined,
    ]);
    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(mockSignOut).not.toHaveBeenCalled();
    result.current?.signout?.();
    expect(mockSignOut).toHaveBeenCalled();
  });

  it("should handle errors", () => {
    (useAuthState as MockedFunction<any>).mockReturnValue([
      mockUser,
      false,
      new Error("test"),
    ]);
    renderHook(() => useAuth(), { wrapper });
    expect(mockNotify).toHaveBeenCalledWith("test");
  });

  it("should handle idle", () => {
    mockSignOut.mockReset();
    (useAuthState as MockedFunction<any>).mockReturnValue([
      mockUser,
      false,
      undefined,
    ]);
    renderHook(() => useAuth(), { wrapper });

    Object.defineProperty(document, "visibilityState", {
      value: "hidden",
      writable: true,
    });
    const idleEvent = createEvent("visibilitychange", document, {});
    fireEvent(document, idleEvent);

    Object.defineProperty(document, "visibilityState", {
      value: "visible",
      writable: true,
    });
    const activeEvent = createEvent("visibilitychange", document, {});
    fireEvent(document, activeEvent);

    expect(mockSignOut).not.toHaveBeenCalled();

    vi.useFakeTimers();
    Object.defineProperty(document, "visibilityState", {
      value: "hidden",
      writable: true,
    });
    const idleEvent2 = createEvent("visibilitychange", document, {});
    fireEvent(document, idleEvent2);
    vi.runAllTimers();

    expect(mockSignOut).toHaveBeenCalled();
    vi.useRealTimers();
  });
});
