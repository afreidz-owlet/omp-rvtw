import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";

const mockUseAuth = vi.fn();

vi.mock("../contexts/Auth", async () => {
  const real = await vi.importActual<typeof import("../contexts/Auth")>(
    "../contexts/Auth"
  );
  return {
    ...real,
    default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    useAuth: mockUseAuth,
  };
});

vi.mock("../contexts/Notifications", () => ({
  useNotifications: () => vi.fn(),
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock("../contexts/DarkMode", () => ({
  useDarkMode: () => vi.fn(),
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock("../pages/Roles", () => ({
  default: () => <div data-testid="roles-page"/>,
}))

import App from "../App";
describe("<App/>", () => {
  function renderForTest(initial?: string[]) {
    return render(
      <MemoryRouter initialEntries={initial}>
        <App />
      </MemoryRouter>
    );
  }

  it("should protect routes", () => {
    mockUseAuth.mockReturnValue({ authenticated: false, loading: false });
    renderForTest(["/devices"]);
    expect(screen.queryByTestId("auth-page")).toBeTruthy();
    expect(screen.queryByTestId("devices-page")).toBeFalsy();
  });

  it("should render routes when authenticated", () => {
    mockUseAuth.mockReturnValue({ authenticated: true, loading: false });
    renderForTest(["/devices"]);
    expect(screen.queryByTestId("auth-page")).toBeFalsy();
    expect(screen.queryByTestId("devices-page")).toBeTruthy();
  });

  it("should have a loading state", () => {
    mockUseAuth.mockReturnValue({ authenticated: false, loading: true });
    renderForTest();
    expect(screen.queryByTestId("loading-page")).toBeTruthy();
  });

  it("should route to all protected routes when authenticated", () => {
    mockUseAuth.mockReturnValue({ authenticated: true, loading: false });
    renderForTest(["/accounts"]);
    expect(screen.queryByTestId("accounts-page")).toBeTruthy();
    renderForTest(["/employees"]);
    expect(screen.queryByTestId("employees-page")).toBeTruthy();
    renderForTest(["/manufacturing"]);
    expect(screen.queryByTestId("manufacturing-page")).toBeTruthy();
    renderForTest(["/roles"]);
    expect(screen.queryByTestId("roles-page")).toBeTruthy();
  })
});
