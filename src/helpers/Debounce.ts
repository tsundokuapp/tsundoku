// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number,
) {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}
