interface CheckPageRangeProps {
  showPage: number;
  totalPages: number;
}

export function CheckPageRange({
  showPage,
  totalPages,
}: CheckPageRangeProps): void {
  if (showPage > totalPages) {
    throw new Error(
      'O número da página não pode ser maior que o total de páginas.',
    );
  }

  if (showPage < 0) {
    throw new Error('O número da página não pode ser menor que zero.');
  }
}
