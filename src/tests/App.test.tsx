import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";

const mockUseAuth = vi.fn();

vi.mock("../contexts/Auth", () => ({
  useAuth: mockUseAuth,
}));

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
    renderForTest(["/devices"]);
    expect(screen.queryByTestId("auth-page")).toBeTruthy();
    expect(screen.queryByTestId("devices-page")).toBeFalsy();
  });

  it("should render routes when authenticated", () => {
    mockUseAuth.mockReturnValue({ user: "test" });
    renderForTest(["/devices"]);
    expect(screen.queryByTestId("auth-page")).toBeFalsy();
    expect(screen.queryByTestId("devices-page")).toBeTruthy();
  });

  it("should have a loading state", () => {
    mockUseAuth.mockReturnValue({ loading: true });
    renderForTest();
    expect(screen.queryByTestId("loading-page")).toBeTruthy();
  });
});
