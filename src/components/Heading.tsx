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
