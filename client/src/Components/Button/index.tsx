import clsx from 'clsx';

export default function Button({
  className,
  children,
  ...rest
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <button
      className={clsx('bg-app-accent rounded-md px-2', className)}
      {...rest}
    >
      {children}
    </button>
  );
}
