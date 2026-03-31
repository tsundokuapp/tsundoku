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
      className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-appMenuBorder bg-appInputBackground px-2 py-2 text-sm font-medium text-appText hover:bg-appGroupBackground focus:outline-none sm:w-full sm:justify-between sm:px-4"
      disabled={disable}
      {...props}
    >
      {children}
    </button>
  );
};
