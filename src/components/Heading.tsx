import cntl from "cntl";

interface IPolyProps<C extends React.ElementType> {
  as?: C;
  children: React.ReactNode;
  type: "page" | "section" | "sub";
}

type HeadingProps<C extends React.ElementType> = IPolyProps<C> &
  Omit<React.ComponentPropsWithoutRef<C>, keyof IPolyProps<C>>;

const Heading = <C extends React.ElementType = "h2">({
  as,
  type,
  children,
  ...rest
}: HeadingProps<C>) => {
  const Component = as || "h2";

  const classes = {
    page: cntl`
      text-3xl
      font-light
`,
    section: cntl`
      text-lg
      font-semibold
`,
    sub: cntl`
      text-sm
      uppercase
      opacity-50
      font-medium
`,
  };

  const className = [rest.className, classes[type]].join(" ");
  delete rest.className;

  return (
    <Component {...rest} className={className}>
      {children}
    </Component>
  );
};

export default Heading;

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  const { render } = await import("@testing-library/react");

  it("should handle variants", () => {
    const { container: heading1 } = render(<Heading type="page">test</Heading>);
    const { container: heading2 } = render(<Heading type="page">test</Heading>);
    const { container: heading3 } = render(<Heading type="sub">test</Heading>);
    const { container: heading4 } = render(
      <Heading type="section">test</Heading>
    );
    expect(heading1.innerHTML).toEqual(heading2.innerHTML);
    expect(heading3.innerHTML).not.toEqual(heading1.innerHTML);
    expect(heading4.innerHTML).not.toEqual(heading2.innerHTML);
  });

  it("should render a different element if specified", () => {
    const { getByText } = render(
      <Heading as="nav" type="page">
        test content
      </Heading>
    );
    expect(getByText("test content").tagName).toBe("NAV");
  });
}
