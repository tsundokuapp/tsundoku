import { cn } from '@/helpers/twUtils';

interface SearchTableProps
  extends Omit<React.HTMLProps<HTMLInputElement>, 'value' | 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  fullWidth?: boolean;
  placeholder?: string;
}

export const SearchTable = ({
  value,
  onChange,
  fullWidth = false,
  placeholder = 'Buscar por nome...',
  ...props
}: SearchTableProps) => {
  return (
    <div
      className="flex w-full items-center justify-end bg-transparent dark:bg-gray-900"
      {...props}
    >
      <div className={cn('relative mt-1 w-72', { 'w-full': fullWidth })}>
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
          <svg
            className="h-4 w-4 text-gray-500 dark:text-gray-400"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="text"
          id="table-search"
          className="block w-full rounded-lg border border-gray-300 bg-slate-100 py-2 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};
