interface HeaderTableProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export const HeaderTable = ({
  title,
  description,
  children,
}: HeaderTableProps) => {
  return (
    <div className="flex items-center justify-between space-x-4 space-y-0 bg-appBackground p-4 md:flex-row">
      <div className="flex flex-row items-center gap-4">
        <h5 className="text-xl font-semibold text-appText">{title}</h5>
        {description && (
          <p className="hidden w-72 text-sm text-appSubtitle md:block">
            {description}
          </p>
        )}
      </div>
      {/* {Use <SearchTable como children} */}
      {children}
    </div>
  );
};
