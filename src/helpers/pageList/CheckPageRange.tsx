interface CheckPageRangeProps {
  showPage: number;
  totalPages: number;
}

export function CheckPageRange({
  showPage,
  totalPages,
}: CheckPageRangeProps): void {
  if (showPage > totalPages) {
    // Poderia usar o Error do Next, mas ainda não estou muito familiarizado.
    throw new Error('Page number cannot be highter than total pages.');
  }

  if (showPage < 0) {
    // Poderia usar o Error do Next, mas ainda não estou muito familiarizado.
    throw new Error('Page number cannot be lower than zero.');
  }
}
