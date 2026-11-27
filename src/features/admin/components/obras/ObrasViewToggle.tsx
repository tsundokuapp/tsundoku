'use client';

import { SquaresFour, Table } from '@phosphor-icons/react/dist/ssr';

import { cn } from '@/shared/utils/cn';

export interface ObrasViewToggleProps {
  viewMode: 'grid' | 'table';
  onChange: (mode: 'grid' | 'table') => void;
  className?: string;
}

export function ObrasViewToggle({
  viewMode,
  onChange,
  className,
}: ObrasViewToggleProps) {
  return (
    <div
      role="group"
      aria-label="Modo de visualização"
      className={cn(
        'flex items-center gap-1 rounded-lg border border-appCardBorder bg-appCardBackground p-1',
        className,
      )}
    >
      <button
        type="button"
        aria-label="Visualização em grade"
        aria-pressed={viewMode === 'grid'}
        onClick={() => onChange('grid')}
        className={cn(
          'flex h-7 w-7 items-center justify-center rounded-md text-appSidebarMuted transition-colors',
          viewMode === 'grid'
            ? 'bg-[#259cc1] text-white shadow-sm'
            : 'hover:bg-appGroupBackground hover:text-appText',
        )}
      >
        <SquaresFour
          size={16}
          weight={viewMode === 'grid' ? 'fill' : 'regular'}
        />
      </button>

      <button
        type="button"
        aria-label="Visualização em tabela"
        aria-pressed={viewMode === 'table'}
        onClick={() => onChange('table')}
        className={cn(
          'flex h-7 w-7 items-center justify-center rounded-md text-appSidebarMuted transition-colors',
          viewMode === 'table'
            ? 'bg-[#259cc1] text-white shadow-sm'
            : 'hover:bg-appGroupBackground hover:text-appText',
        )}
      >
        <Table size={16} weight={viewMode === 'table' ? 'fill' : 'regular'} />
      </button>
    </div>
  );
}
