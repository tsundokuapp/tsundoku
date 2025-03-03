// Color Checked
// Components Checked

import { MagnifyingGlass } from '@phosphor-icons/react/dist/ssr';

import { cn } from '@/helpers/twUtils';

interface HeaderSearchProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  icon?: 'Enter' | 'Search';
}

export function HeaderSearch({
  placeholder = 'Buscar...',
  icon = 'Enter',
  className,
  ...props
}: HeaderSearchProps) {
  return (
    <form className="flex items-center gap-3 rounded-md bg-appSearchBackground px-5 py-2.5">
      <input
        type="text"
        placeholder={placeholder}
        className={cn(
          'w-[320px] flex-1 bg-transparent text-sm text-appSearchText outline-none placeholder:text-appSearchPlaceholder',
          className,
        )}
        {...props}
      />
      {icon === 'Enter' ? (
        <div className="flex h-5 w-12 items-center justify-center rounded border border-dashed border-appSearchPlaceholder text-xs text-appSearchPlaceholder">
          ENTER
        </div>
      ) : (
        <MagnifyingGlass className="h-5 w-5 text-appSearchPlaceholder" />
      )}
    </form>
  );
}
