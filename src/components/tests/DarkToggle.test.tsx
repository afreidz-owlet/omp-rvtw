import { fireEvent, act } from "@testing-library/react";
import { render, screen } from "@testing-library/react";

import DarkToggle from "../DarkToggle";
import { useDarkMode } from "../../contexts/DarkMode";

vi.mock("../../contexts/DarkMode", () => ({
  useDarkMode: vi.fn(),
}));

describe("<DarkToggle/>", () => {
  it("Should render disabled", () => {
    (useDarkMode as any).mockReturnValue({ enabled: false });
    render(<DarkToggle />);
    expect(screen.queryByText("Enable Dark Mode")).toBeTruthy();
    expect(screen.queryByText("Disable Dark Mode")).toBeFalsy();
  });
  it("Should render enabled", async () => {
    (useDarkMode as any).mockReturnValue({ enabled: true });
    render(<DarkToggle />);
    expect(screen.queryByText("Enable Dark Mode")).toBeFalsy();
    expect(screen.queryByText("Disable Dark Mode")).toBeTruthy();
  });
  it("Should toggle", () => {
    const toggle = vi.fn();
    (useDarkMode as any).mockReturnValue({ enabled: false, toggle })
    render(<DarkToggle/>);
    act(() => {
      fireEvent.click(screen.getByRole('switch'))
    })
    expect(toggle).toHaveBeenCalledOnce()
  })
});
