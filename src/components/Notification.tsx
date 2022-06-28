import cntl from "cntl";

export default function Notification({
  onClick,
  children,
  ...rest
}: JSX.IntrinsicElements['article']) {
  const className = cntl`
    p-3
    fixed
    top-2
    shadow-lg
    rounded-lg
    self-center
    text-neutral-0
    cursor-pointer
    bg-secondary-red-900
  `;

  return (
    <article {...rest} onClick={onClick} className={className}>
      {children}
    </article>
  );
}
