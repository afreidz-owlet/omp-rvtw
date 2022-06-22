import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import Nav from "../Nav";

describe("<Nav/>", () => {
  it("Should render an active link", () => {
    render(
      <MemoryRouter initialEntries={["/devices"]}>
        <Nav />
      </MemoryRouter>
    );
    expect(
      screen.getByRole("link", { name: "Devices" }).getAttribute("aria-current")
    ).toMatch("page");
    expect(
      screen
        .getByRole("link", { name: "Employees" })
        .getAttribute("aria-current")
    ).toBeFalsy();
  });
});
