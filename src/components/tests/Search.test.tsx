import { render, screen } from "@testing-library/react";

import Search from "../Search";
import { useSearch } from "../../contexts/Search";

vi.mock("../../contexts/Search", () => ({
  useSearch: vi.fn(),
}));

describe("<Search/>", () => {
  it("Should render if there is no search", () => {
    (useSearch as any).mockReturnValue({})
    render(<Search/>)
    expect(screen.queryByRole('no-search')).toBeTruthy()
  });
  it("Should render a search input", () => {
    (useSearch as any).mockReturnValue({ placeholder: 'Test Search' })
    render(<Search/>)
    expect(screen.queryByRole('no-search')).toBeFalsy()
    expect(screen.queryAllByText('Test Search')).toBeTruthy()
  })
});
