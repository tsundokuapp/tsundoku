interface ActionButtonControlProps {
  children: React.ReactNode;
  onClick: () => void;
  disable: boolean;
}

export const ActionButtonControl = ({
  children,
  onClick,
  disable,
  ...props
}: ActionButtonControlProps) => {
  return (
    <button
      role="button"
      onClick={onClick}
      className="inline-flex h-10 w-full items-center justify-between rounded-lg border border-zinc-800 bg-transparent px-4 py-2 text-sm font-medium text-zinc-500 hover:text-zinc-400 focus:outline-none"
      disabled={disable}
      {...props}
    >
      {children}
    </button>
  );
};
