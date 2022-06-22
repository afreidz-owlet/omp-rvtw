import { render, screen } from "@testing-library/react";

import App from "./App";
import { useDarkMode } from "./contexts/DarkMode";

vi.mock("./contexts/DarkMode", () => ({
  useDarkMode: vi.fn(),
}));

vi.mock("react-router-dom", () => {
  return {
    Route: () => <div/>,
    Routes: () => <div/>,
    NavLink: () => <div/>,
    Navigate: () => <div/>,
    useLocation: vi.fn(),
  };
});

describe("<App/>", () => {
  it("Should render in light mode by default", async () => {
    (useDarkMode as any).mockReturnValue({ enabled: false });
    render(<App />);
    expect(screen.queryByRole("app-dark")).toBeFalsy();
    expect(screen.queryByRole("app-light")).toBeTruthy();
  });
  it("Should render in dark mode", async () => {
    (useDarkMode as any).mockReturnValue({ enabled: true });
    render(<App />);
    expect(screen.queryByRole("app-dark")).toBeTruthy();
    expect(screen.queryByRole("app-light")).toBeFalsy();
  });
});
