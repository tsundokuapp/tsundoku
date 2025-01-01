import { cn } from '@/helpers/twUtils';

interface TdDefaultProps {
  children: React.ReactNode;
  main?: boolean;
}

export const TdDefault = ({ children, main }: TdDefaultProps) => {
  return (
    <td className="px-auto hidden py-4 text-center lg:table-cell">
      <span
        className={cn('font-medium text-black dark:text-gray-400', {
          'font-semibold text-gray-900 dark:text-white': main,
        })}
      >
        {children}
      </span>
    </td>
  );
};
