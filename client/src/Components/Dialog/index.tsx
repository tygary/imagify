import * as RadixDialog from '@radix-ui/react-dialog';

export function Dialog({ children }: { children: React.ReactNode }) {
  return <RadixDialog.Root>{children}</RadixDialog.Root>;
}

export function DialogTrigger({ children }: { children: React.ReactNode }) {
  return <RadixDialog.Trigger>{children}</RadixDialog.Trigger>;
}

export function DialogContent({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RadixDialog.Overlay className="dialog-overlay" />
      <RadixDialog.Content className="dialog">
        <RadixDialog.Close className="dialog-close">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-app-text hover:text-app-accent"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </RadixDialog.Close>
        {children}
      </RadixDialog.Content>
    </>
  );
}
