export function ScrollPage(
  scrollMode: string,
  comicContainerRef: React.RefObject<HTMLElement>,
  page: number,
) {
  if (scrollMode === 'infinite' && comicContainerRef.current) {
    const targetElement = comicContainerRef.current.querySelector(
      `#page-${page}`,
    );
    if (targetElement) {
      const offsetTop =
        targetElement.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  }
}
