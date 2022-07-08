import cntl from "cntl";

type Variant = "default" | "text";

interface IButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  type?: "button" | "submit" | "reset";
  variant?: Variant;
}

export default function Button({
  children,
  className,
  variant = "default",
  ...rest
}: IButtonProps) {
  const buttonClasses = (variant: Variant) => cntl`
    ${className}

    px-5
    py-2.5 
    text-sm 
    rounded-lg 
    ease-in-out
    font-medium 
    text-center 
    duration-200
    focus:ring-2
    transition-colors
    focus:outline-none
    focus:ring-offset-1
    focus:ring-secondary-purple-600 
    dark:ring-offset-secondary-blue-900
    dark:focus:ring-secondary-yellow-600 

    ${variant === "text" ? "shadow-none" : "shadow-sm"}
    ${variant === "text" ? "uppercase tracking-wide" : ""}
    ${variant === "text" ? "text-primary-green-type" : "text-white"}
    ${variant === "text" ? "bg-transparent" : "bg-primary-green-800"}
    ${
      variant === "text"
        ? "dark:text-secondary-purple-800"
        : "dark:bg-secondary-purple-800"
    }
`;

  return (
    <button {...rest} className={buttonClasses(variant)}>
      {children}
    </button>
  );
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  const { render } = await import("@testing-library/react");

  it("should handle variants", () => {
    const { container: button1 } = render(<Button>test</Button>);
    const { container: button2 } = render(<Button>test</Button>);
    const { container: button3 } = render(<Button variant="text">test</Button>);
    expect(button1.innerHTML).toEqual(button2.innerHTML);
    expect(button3.innerHTML).not.toEqual(button1.innerHTML);
  });
}
