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
    <div className="flex-column flex items-center justify-between space-x-4 space-y-4 bg-slate-200 p-4 pb-4 dark:bg-gray-900 md:flex-row md:space-y-0">
      <div className="flex flex-row items-center gap-4">
        <h5 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          {title}
        </h5>
        {description && (
          <p className="flex w-72 text-sm text-gray-400 dark:text-gray-400 md:block">
            {description}
          </p>
        )}
      </div>
      {/* {Use <SearchTable como children} */}
      {children}
    </div>
  );
};
