import { merge } from '@/helpers/twUtils';

interface TdDefaultProps {
  children: React.ReactNode;
  main?: boolean;
  hiddenCell?: 'md' | 'sm';
}

export const TdDefault = ({ children, main, hiddenCell }: TdDefaultProps) => {
  return (
    <td
      className={merge('px-auto py-4 text-center', {
        'hidden md:table-cell': hiddenCell === 'md',
        'hidden sm:table-cell': hiddenCell === 'sm',
      })}
    >
      <span
        className={merge('font-medium text-black dark:text-gray-400', {
          'font-semibold text-gray-900 dark:text-white': main,
        })}
      >
        {children}
      </span>
    </td>
  );
};
