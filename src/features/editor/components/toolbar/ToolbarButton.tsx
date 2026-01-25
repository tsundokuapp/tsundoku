import { cn } from '@/shared/utils/cn';

interface ToolbarButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
}

export const ToolbarButton = ({
  icon,
  onClick,
  isActive = false,
}: ToolbarButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex h-7 min-w-7 items-center justify-center rounded-sm text-sm text-appText hover:bg-neutral-200/80',
        {
          'bg-neutral-200/80': isActive,
        },
      )}
    >
      {icon}
    </button>
  );
};
