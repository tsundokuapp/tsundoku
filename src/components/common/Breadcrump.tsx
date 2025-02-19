'use client';

import { DotOutline } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ComponentProps } from 'react';

interface BreadcrumpProps extends ComponentProps<'nav'> {
  removeList?: string[];
  sufixList?: string[];
  isReader?: boolean;
  className?: string;
}

export function Breadcrump({
  removeList = [],
  sufixList = [],
  isReader,
  className,
  ...props
}: BreadcrumpProps) {
  const pathname = usePathname();
  const paths = pathname.split('/').filter((x) => x.trim().length > 0);

  removeList.forEach((removeItem) => {
    const index = paths.indexOf(removeItem);
    if (index > -1) {
      paths.splice(index, 1);
    }
  });

  if (isReader) {
    paths.splice(-2, 2);
  }

  while (sufixList.length < paths.length) {
    sufixList.unshift('');
  }

  return (
    <nav className={className} {...props}>
      <ol className="flex flex-row gap-4">
        <li>
          <Link
            href="/"
            className="hover:underline hover:decoration-appHighlight hover:decoration-dotted hover:decoration-2 hover:underline-offset-4"
          >
            Home
          </Link>
        </li>

        {paths.length > 0 &&
          paths.map((pathName, pathIndex) => {
            const pathLink = `/${paths.slice(0, pathIndex + 1).join('/')}`;
            const isLastItem = pathIndex === paths.length - 1;
            pathName = pathName.replace(/-/g, ' ');
            const pathNameWithSuffix = `${sufixList[pathIndex]} ${pathName}`;

            if (removeList.includes(pathName)) {
              return null;
            }

            return (
              <li
                key={pathLink}
                className="flex flex-row items-center gap-4 capitalize"
              >
                <DotOutline size={24} weight="fill" />

                {isLastItem && !isReader ? (
                  <span className="font-bold">{pathNameWithSuffix}</span>
                ) : (
                  <Link
                    href={pathLink}
                    className="hover:underline hover:decoration-appHighlight hover:decoration-dotted hover:decoration-2 hover:underline-offset-4"
                  >
                    {pathNameWithSuffix}
                  </Link>
                )}
              </li>
            );
          })}
      </ol>
    </nav>
  );
}
