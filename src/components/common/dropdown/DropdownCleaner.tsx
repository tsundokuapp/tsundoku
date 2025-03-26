import { XCircle } from '@phosphor-icons/react/dist/ssr';
import type { ComponentProps } from 'react';

import { cn } from '@/helpers/twUtils';

type DropdownCleanerProps = ComponentProps<'label'> & {
  onClean?: () => void;
};

export default function DropdownCleaner({
  className,
  onClean,
  ...props
}: DropdownCleanerProps) {
  function handleCleanAction() {
    if (onClean) onClean();
  }

  return (
    <div className="dropdown-cleaner">
      <label
        tabIndex={0}
        data-testid="dropdown-cleaner"
        className={cn(
          'mx-1 mb-1 flex cursor-pointer items-center rounded-lg bg-appMenuBackground px-3 py-2 text-sm text-appMenuText hover:bg-appMenuHover focus:bg-appMenuHover',
          className,
        )}
        onClick={handleCleanAction}
        {...props}
      >
        <span className="ml-2 font-bold">Limpar Filtro</span>
        <XCircle weight="fill" className="ml-auto h-5 w-5" />
      </label>
    </div>
  );
}
