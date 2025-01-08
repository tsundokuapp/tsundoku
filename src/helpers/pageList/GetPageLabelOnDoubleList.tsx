import { CheckPageRange } from './CheckPageRange';

interface GetPageLabelOnDoubleListProps {
  showPage: number;
  totalPages: number;
}

export function GetPageLabelOnDoubleList({
  showPage,
  totalPages,
}: GetPageLabelOnDoubleListProps): string {
  CheckPageRange({ showPage, totalPages }); // Error Handling

  const nextPage = showPage + 1;

  if (totalPages % 2 === 0) {
    return `Páginas ${showPage} - ${nextPage}`;
  } else {
    if (showPage === totalPages) {
      return `Página ${showPage}`;
    } else {
      return `Páginas ${showPage} - ${nextPage}`;
    }
  }
}
