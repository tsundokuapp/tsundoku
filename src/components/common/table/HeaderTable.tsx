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
    <div className="flex items-center justify-between space-x-4 space-y-0 bg-slate-200 p-4 dark:bg-gray-900 md:flex-row">
      <div className="flex flex-row items-center gap-4">
        <h5 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          {title}
        </h5>
        {description && (
          <p className="hidden w-72 text-sm text-gray-400 dark:text-gray-400 md:block">
            {description}
          </p>
        )}
      </div>
      {/* {Use <SearchTable como children} */}
      {children}
    </div>
  );
};
