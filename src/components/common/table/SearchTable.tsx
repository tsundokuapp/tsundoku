// Color Checked
// Components Checked
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
    <div className="flex w-full items-center justify-end" {...props}>
      <div className={cn('relative mt-1 w-72', { 'w-full': fullWidth })}>
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
          <svg
            className="h-4 w-4 text-appInputIcon"
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
          className="focus:ring-primary focus:border-appInputFocus block h-10 w-full rounded-lg border border-appInputBorder bg-appInputBackground py-2 ps-10 text-sm text-appInputText placeholder-appInputPlaceholder"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};
