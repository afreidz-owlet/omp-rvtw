import { renderHook, act } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";

import SearchContext from "../Search";
import { useSearch } from "../../contexts/Search";

const wrapper = ({ children }: { children: JSX.Element }) => (
  <MemoryRouter>
    <SearchContext>{children}</SearchContext>
  </MemoryRouter>
);

describe("<SearchContext/>", () => {
  it("Should have a default state", () => {
    const { result } = renderHook(() => useSearch());
    expect(result.current?.placeholder).toBeDefined();
  });

  it("Should have a state for each route", async () => {
    const { result, rerender } = renderHook(
      () => ({
        navigate: useNavigate(),
        search: useSearch(),
      }),
      { wrapper }
    );

    act(() => {
      result.current.navigate("/devices");
      rerender();
    });

    expect(result.current.search?.placeholder?.toLowerCase()).toContain("dsn");

    act(() => {
      result.current.navigate("/accounts");
      rerender();
    });

    expect(result.current.search?.placeholder?.toLowerCase()).toContain(
      "account"
    );

    act(() => {
      result.current.navigate("/employees");
      rerender();
    });

    expect(result.current.search?.placeholder?.toLowerCase()).toContain(
      "employee"
    );

    act(() => {
      result.current.navigate("/");
      rerender();
    })

    expect(result.current.search).toBeFalsy()
  });
});
