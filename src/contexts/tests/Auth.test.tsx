import { User } from "firebase/auth";
import {
  fireEvent,
  renderHook,
  createEvent,
  act,
} from "@testing-library/react";

type AuthChangeCB = (u: User | null) => void;

const mockNotify = vi.fn();
const mockSignIn = vi.fn();
const mockSignOut = vi.fn();
const mockNavigate = vi.fn();
const mockAdapters = new Map();
const mockAuthChange = vi.fn();
const mockDeleteUser = vi.fn();

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

vi.mock("../../adapters", () => ({ default: mockAdapters }));

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock("firebase/app", () => ({
  initializeApp: vi.fn(),
}));

vi.mock("../../adapters/auth", () => ({
  signin: mockSignIn,
  signOut: mockSignOut,
  deleteUser: mockDeleteUser,
  onAuthChange: mockAuthChange,
}));

vi.mock("../../contexts/Notifications", () => ({
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useNotifications: () => mockNotify,
}));

describe("Authentication Context", () => {
  mockAdapters.set("FBAPP", "test");
  mockAdapters.set("FBAUTH", "test");
  mockAdapters.set("ALLOWLIST", ["foo.com"]);

  it("Should have a default state", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current?.user).toBeFalsy();
    expect(result.current?.loading).toBe(true);
  });

  it("Should handle authenticating a user", () => {
    mockAuthChange.mockImplementation((cb?: AuthChangeCB) => cb?.(mockUser));

    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current?.user?.displayName).toBe("Test User");
  });

  it("Should handle users from incorrect domains", () => {
    mockAuthChange.mockImplementation((cb?: AuthChangeCB) =>
      cb?.({ ...mockUser, email: "test@bad-domain.com" })
    );

    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current?.user).toBeFalsy();
  });

  it("Should handle no user", () => {
    mockAuthChange.mockImplementation((cb?: AuthChangeCB) => cb?.(null));

    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current?.user).toBeFalsy();
  });

  it("should handle sign out", () => {
    mockAuthChange.mockImplementation((cb?: AuthChangeCB) => cb?.(mockUser));
    mockSignOut.mockImplementation((cb) => cb?.());

    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(mockSignOut).not.toHaveBeenCalled();

    act(() => {
      result.current?.signout?.();
    });

    expect(mockSignOut).toHaveBeenCalled();
  });

  it("should handle idle", () => {
    mockAuthChange.mockImplementation((cb?: AuthChangeCB) => cb?.(mockUser));

    mockSignOut.mockReset();
    renderHook(() => useAuth(), { wrapper });

    Object.defineProperty(document, "visibilityState", {
      value: "hidden",
      writable: true,
    });
    const idleEvent = createEvent("visibilitychange", document, {});

    act(() => {
      fireEvent(document, idleEvent);
    });

    Object.defineProperty(document, "visibilityState", {
      value: "visible",
      writable: true,
    });
    const activeEvent = createEvent("visibilitychange", document, {});

    act(() => {
      fireEvent(document, activeEvent);
    });

    expect(mockSignOut).not.toHaveBeenCalled();

    vi.useFakeTimers();
    Object.defineProperty(document, "visibilityState", {
      value: "hidden",
      writable: true,
    });
    const idleEvent2 = createEvent("visibilitychange", document, {});

    act(() => {
      fireEvent(document, idleEvent2);
    });
    vi.runAllTimers();

    expect(mockSignOut).toHaveBeenCalled();
    vi.useRealTimers();
  });
});
