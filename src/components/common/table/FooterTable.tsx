import { cn } from '@/helpers/twUtils';

interface CelNavegationProps {
  text: string;
  lastChildren?: boolean;
  firstChildren?: boolean;
  active?: boolean;
}

const CelNavegation = ({
  text,
  lastChildren,
  firstChildren,
  active,
}: CelNavegationProps) => {
  return (
    <li
      className={cn(
        'ms-0 flex h-8 cursor-pointer items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-slate-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white',
        {
          'rounded-s-lg': firstChildren,
          'rounded-e-lg': lastChildren,
          'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-white': active,
        },
      )}
    >
      {text}
    </li>
  );
};

export const FooterTable = () => {
  return (
    <nav
      className="flex-column flex flex-wrap items-center justify-between p-4 dark:bg-gray-900 md:flex-row"
      aria-label="Table navigation"
    >
      <span className="mb-4 hidden w-full text-sm font-normal text-gray-500 dark:text-gray-400 md:mb-0 md:block md:w-auto">
        Mostrando{' '}
        <span className="font-semibold text-gray-900 dark:text-white">
          1-10
        </span>{' '}
        de{' '}
        <span className="font-semibold text-gray-900 dark:text-white">100</span>
      </span>
      <ul className="inline-flex h-8 -space-x-px text-sm">
        <CelNavegation text="Anterior" firstChildren />
        <CelNavegation text="1" />
        <CelNavegation text="2" />
        <CelNavegation text="3" active />
        <CelNavegation text="4" />
        <CelNavegation text="5" />
        <CelNavegation text="Próximo" lastChildren />
      </ul>
    </nav>
  );
};
