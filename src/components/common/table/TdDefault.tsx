import { cn } from '@/helpers/twUtils';

interface TdDefaultProps {
  children: React.ReactNode;
  main?: boolean;
  hiddenCell?: 'md' | 'sm';
}

export const TdDefault = ({ children, main, hiddenCell }: TdDefaultProps) => {
  return (
    <td
      className={cn('px-auto py-4 text-center', {
        'hidden md:table-cell': hiddenCell === 'md',
        'hidden sm:table-cell': hiddenCell === 'sm',
      })}
    >
      <span
        className={cn('font-medium text-appText', {
          'font-semibold text-gray-900 dark:text-white': main,
        })}
      >
        {children}
      </span>
    </td>
  );
};
