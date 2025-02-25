import { CSSProperties } from 'react';

import { merge } from '@/helpers/twUtils';

interface TitleColProps {
  title: string;
  reorder?: boolean;
  className?: CSSProperties | string;
  onClick?: () => void;
  position?: 'left' | 'right' | 'center';
  hiddenCell?: 'md' | 'sm';
}

export const TitleColTable = ({
  title,
  reorder,
  className,
  onClick,
  position = 'center',
  hiddenCell,
}: TitleColProps) => {
  return (
    <th
      scope="col"
      className={merge(
        'table-cell py-3 pl-3',
        {
          'hidden md:table-cell': hiddenCell === 'md',
          'hidden sm:table-cell': hiddenCell === 'sm',
        },
        className,
      )}
    >
      <div
        className={merge('flex items-center px-3', {
          'justify-start': position === 'left',
          'justify-end': position === 'right',
          'justify-center': position === 'center',
        })}
      >
        {title}
        {reorder && (
          <span
            className="cursor-pointer"
            tabIndex={0}
            onClick={() => onClick?.()}
          >
            <svg
              className="ms-1.5 h-3 w-3"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
            </svg>
          </span>
        )}
      </div>
    </th>
  );
};
