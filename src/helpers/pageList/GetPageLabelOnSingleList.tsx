import { CheckPageRange } from './CheckPageRange';

interface GetPageLabelOnSingleListProps {
  showPage: number;
  totalPages: number;
}

export function GetPageLabelOnSingleList({
  showPage,
  totalPages,
}: GetPageLabelOnSingleListProps): string {
  CheckPageRange({ showPage, totalPages }); // Error Handling

  return `Página ${showPage}`;
}
