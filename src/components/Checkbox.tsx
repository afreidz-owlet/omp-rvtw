import cntl from "cntl";

interface ICheckboxProps extends React.HTMLAttributes<HTMLInputElement> {
  label?: string;
  helper?: string;
  checked?: boolean;
  changeHandler?: (c: boolean) => void;
}

export default function Checkbox({
  id,
  label,
  helper,
  checked,
  changeHandler,
  ...rest
}: ICheckboxProps) {
  const cid = id || `checkbox_${+new Date()}`;

  const classes = {
    input: cntl`
      h-7
      w-7
      border
      rounded
      relative
      outline-0
      shadow-sm
      bg-neutral-0
      focus:ring-2
      ring-offset-2
      appearance-none
      ring-offset-white
      border-neutral-400
      checked:bg-primary-green-type
      focus:ring-primary-green-type

      dark:border-neutral-100
      dark:bg-neutral-0/[0.05]
      dark:ring-secondary-blue-900
      dark:checked:bg-secondary-purple-800
      dark:ring-offset-secondary-purple-800

      checked:after:w-2
      checked:after:h-3
      checked:after:absolute
      checked:after:rotate-45
      checked:after:border-t-0
      checked:after:border-l-0
      checked:after:border-white
      checked:after:top-[0.4rem]
      checked:after:border-[3px]
      checked:after:left-[0.6rem]
`,
  };

  return (
    <div className="flex">
      <div className="flex h-5 items-center">
        <input
          {...rest}
          id={cid}
          type="checkbox"
          checked={checked}
          className={classes.input}
          onChange={(e) => changeHandler?.(e.target.checked)}
          aria-describedby={helper ? `${cid}_description` : ""}
        />
      </div>
      {(label || helper) && (
        <div className="ml-2 text-sm">
          {label && (
            <label
              htmlFor={cid}
              className="text-gray-900 dark:text-gray-300 font-medium"
            >
              {label}
            </label>
          )}
          {helper && (
            <p
              id={`${cid}_description`}
              className="text-gray-500 dark:text-gray-300 text-xs font-normal"
            >
              {helper}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  const { render } = await import("@testing-library/react");

  it("should handle helpers and labels", () => {
    const { container: c1 } = render(<Checkbox />);
    expect(c1.getElementsByTagName("p").length).toBe(0);
    expect(c1.getElementsByTagName("label").length).toBe(0);
    const { container: c2, getByText } = render(<Checkbox label="testing" />);
    expect(c2.getElementsByTagName("p").length).toBe(0);
    expect(c2.getElementsByTagName("label").length).not.toBe(0);
    expect(getByText("testing")).toBeTruthy();
    const { container: c3, getByText: gbt2 } = render(
      <Checkbox helper="helper foo" />
    );
    expect(c3.getElementsByTagName("p").length).not.toBe(0);
    expect(gbt2("helper foo")).toBeTruthy();
  });
}
