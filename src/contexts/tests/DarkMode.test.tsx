import { renderHook, act } from "@testing-library/react";

import DarkModeContext, { useDarkMode } from "../DarkMode";

const wrapper = ({ children }: { children: JSX.Element }) => (
  <DarkModeContext>{children}</DarkModeContext>
);

describe("Dark Mode Context", () => {
  it("Should have a default state", () => {
    const { result } = renderHook(() => useDarkMode(), { wrapper });
    expect(result.current.enabled).toBe(false);
  });
  it("Should toggle", () => {
    const { result, rerender } = renderHook(() => useDarkMode(), { wrapper });
    expect(result.current.enabled).toBe(false);
    act(() => {
      result.current.toggle?.();
      rerender();
    });
    expect(result.current.enabled).toBe(true);
  });
});
