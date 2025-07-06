import { cn } from '@/helpers/twUtils';

interface CelNavegationProps {
  text: string;
  lastChildren?: boolean;
  firstChildren?: boolean;
  active?: boolean;
  onClick?: () => void;
}

interface IFooterTable {
  totalItems: number;
  itemsPerPage: number;
  itemsVisible: number;
  currentPage: number;
  onPrevPage: () => void;
  onNextPage: () => void;
  onGoToPage: (page: number) => void;
}

const CelNavegation = ({
  text,
  lastChildren,
  firstChildren,
  active,
  onClick,
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
      onClick={onClick}
    >
      <span>{text}</span>
    </li>
  );
};

export const FooterTable = ({
  itemsPerPage,
  itemsVisible,
  currentPage,
  totalItems,
  onPrevPage,
  onNextPage,
  onGoToPage,
}: IFooterTable) => {
  const numberPages = Math.ceil(totalItems / itemsPerPage);

  const RenderCelNavegation = ({ numberPages }: { numberPages: number }) => {
    return (
      <>
        {Array.from({ length: numberPages }, (_, i) => i + 1).map(
          (item, index) => (
            <CelNavegation
              key={item}
              text={item.toString()}
              active={currentPage === index + 1}
              onClick={() => onGoToPage(item * itemsPerPage - itemsPerPage)}
            />
          ),
        )}
      </>
    );
  };

  return (
    <nav
      className="flex-column flex flex-wrap items-center justify-end p-4 md:flex-row md:justify-between"
      aria-label="Table navigation"
    >
      <span className="mb-4 hidden w-full text-sm font-normal text-appSubtitle md:mb-0 md:block md:w-auto">
        Mostrando{' '}
        <span className="font-semibold text-appText">{itemsVisible}</span> de{' '}
        <span className="font-semibold text-appText">{totalItems}</span>
      </span>
      <ul className="inline-flex h-8 -space-x-px text-sm">
        <CelNavegation
          text="Anterior"
          firstChildren
          onClick={() => onPrevPage()}
        />
        {numberPages > 0 && <RenderCelNavegation numberPages={numberPages} />}
        <CelNavegation
          text="Próximo"
          lastChildren
          onClick={() => onNextPage()}
        />
      </ul>
    </nav>
  );
};
