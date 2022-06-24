import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";

import SplashLayout from "../Splash";
import { useDarkMode } from "../../contexts/DarkMode";

vi.mock("../../contexts/DarkMode", () => ({
  useDarkMode: vi.fn(),
}));

function renderForTest() {
  return render(
    <MemoryRouter>
      <SplashLayout />
    </MemoryRouter>
  );
}

describe("<MainLayout/>", async () => {
  it("Should render in light mode by default", () => {
    (useDarkMode as any).mockReturnValue({ enabled: false });
    renderForTest();
    expect(screen.queryByRole("app-dark")).toBeFalsy();
    expect(screen.queryByRole("app-light")).toBeTruthy();
  });
  it("Should render in dark mode", () => {
    (useDarkMode as any).mockReturnValue({ enabled: true });
    renderForTest();
    expect(screen.queryByRole("app-dark")).toBeTruthy();
    expect(screen.queryByRole("app-light")).toBeFalsy();
  });
});
