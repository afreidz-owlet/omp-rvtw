import cntl from "cntl";

interface ITextFieldProps extends React.HTMLAttributes<HTMLInputElement> {
  id: string;
  label?: React.ReactNode;
}

export default function TextField({ id, label, ...rest }: ITextFieldProps) {
  const classes = {
    label: cntl`
      mb-2
      block 
      text-sm
      font-medium
`,
    input: cntl`
      p-2.5
      block
      w-full
      border
      text-sm
      rounded-lg
      focus:ring-2
      bg-neutral-200
      text-neutral-800
      focus:outline-none
      border-neutral-400
      focus:ring-offset-2
      dark:border-neutral-0/10
      dark:bg-secondary-blue-890
      focus:ring-secondary-purple-600 
      dark:ring-offset-secondary-blue-900
      dark:focus:ring-secondary-yellow-600 
`,
  };

  return (
    <>
      {label && (
        <label htmlFor={id} className={classes.label}>
          {label}
        </label>
      )}
      <input {...rest} id={id} className={classes.input} />
    </>
  );
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  const { render } = await import("@testing-library/react");

  it("should handle labels", () => {
    const { container } = render(<TextField id="test-field" />);
    expect(container.getElementsByTagName("label").length).toBe(0);
    const { container: container2 } = render(
      <TextField id="test-field-2" label="label" />
    );
    expect(container2.getElementsByTagName("label").length).toBe(1);
    expect(container2.getElementsByTagName("input").length).toBe(1);
    expect(container.getElementsByTagName("input").length).toBe(1);
  });
}
