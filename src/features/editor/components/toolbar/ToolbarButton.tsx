import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/components/ui/tooltip';
import { cn } from '@/shared/utils/cn';

interface ToolbarButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
  tooltip?: string;
}

export const ToolbarButton = ({
  icon,
  onClick,
  isActive = false,
  tooltip,
}: ToolbarButtonProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        {tooltip && <TooltipContent>{tooltip}</TooltipContent>}
        <TooltipTrigger>
          <button
            onClick={onClick}
            className={cn(
              'flex h-7 min-w-7 items-center justify-center rounded-sm text-sm text-appText hover:bg-white hover:text-black',
              {
                'bg-neutral-200/80': isActive,
              },
            )}
          >
            {icon}
          </button>
        </TooltipTrigger>
      </Tooltip>
    </TooltipProvider>
  );
};
