'use client';

import { DotOutline } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ComponentProps } from 'react';

import { DropdownContainer } from '@/shared/components/ui/dropdown/DropdownContainer';
import { DropdownOption } from '@/shared/components/ui/dropdown/DropdownOption';

import { cn } from '@/shared/utils/cn';

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
  const router = useRouter();
  const paths = pathname.split('/').filter((x) => x.trim().length > 0);

  const pathsWithoutRemoved = paths.filter(
    (path) => !removeList.includes(path),
  );

  const desktopPaths = [...pathsWithoutRemoved];

  if (isReader) {
    desktopPaths.splice(-1, 1);
  }

  const normalizeSuffixList = (size: number) => {
    const normalized = [...sufixList];
    while (normalized.length < size) {
      normalized.unshift('');
    }
    return normalized;
  };

  const desktopSuffixList = normalizeSuffixList(desktopPaths.length);
  const mobileSuffixList = normalizeSuffixList(pathsWithoutRemoved.length);

  const ShortName = (name: string) => {
    if (typeof name !== 'string') return 'Ops... Ocorreu um erro';

    if (name.length > 45) {
      return name.substring(0, 45) + '...';
    }
    return name;
  };

  const CapitalizeLabel = (name: string) => {
    return name
      .split(' ')
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const buildItems = (itemsPaths: string[], suffixes: string[]) => {
    return itemsPaths.map((pathName, pathIndex) => {
      const pathLink = `/${itemsPaths.slice(0, pathIndex + 1).join('/')}`;
      const cleanedName = pathName.replace(/-/g, ' ');
      const pathNameWithSuffix = `${suffixes[pathIndex]} ${cleanedName}`.trim();

      return {
        href: pathLink,
        label: pathNameWithSuffix,
      };
    });
  };

  const desktopItems = buildItems(desktopPaths, desktopSuffixList);
  const mobileItems = buildItems(pathsWithoutRemoved, mobileSuffixList);
  const mobileCurrentLabel =
    mobileItems[mobileItems.length - 1]?.label || 'Home';

  return (
    <nav
      className={cn('flex items-center justify-center', className)}
      {...props}
    >
      <div className="md:hidden">
        <DropdownContainer
          label={ShortName(CapitalizeLabel(mobileCurrentLabel))}
          value={ShortName(CapitalizeLabel(mobileCurrentLabel))}
          className="min-w-[148px]"
          buttonClassname="border-appMenuBorder bg-appInputBackground text-appText"
          menuClassname="min-w-[220px]"
          matchTriggerWidth={false}
        >
          <DropdownOption
            label="Home"
            value="/"
            selected={pathname === '/'}
            action={() => router.push('/')}
          />

          {mobileItems.map((item, index) => (
            <DropdownOption
              key={item.href}
              label={ShortName(CapitalizeLabel(item.label))}
              value={item.href}
              selected={index === mobileItems.length - 1}
              action={() => router.push(item.href)}
            />
          ))}
        </DropdownContainer>
      </div>

      <ol className="flex flex-row items-center justify-center gap-4">
        <li className="hidden md:flex">
          <Link
            href="/"
            className="hover:underline hover:decoration-appHighlight hover:decoration-dotted hover:decoration-2 hover:underline-offset-4"
          >
            Home
          </Link>
        </li>

        {desktopItems.length > 0 &&
          desktopItems.map((item, pathIndex) => {
            const isLastItem = pathIndex === desktopItems.length - 1;

            return (
              <li
                key={item.href}
                className="hidden flex-row items-center gap-4 capitalize md:flex"
              >
                <DotOutline size={24} weight="fill" />

                {isLastItem && !isReader ? (
                  <span className="mr-4 text-nowrap font-bold">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="text-center hover:underline hover:decoration-appHighlight hover:decoration-dotted hover:decoration-2 hover:underline-offset-4"
                  >
                    {ShortName(item.label)}
                  </Link>
                )}
              </li>
            );
          })}
      </ol>
    </nav>
  );
}
