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
