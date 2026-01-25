export function ScrollPage(
  scrollMode: string,
  page: number,
  behavior: 'smooth' | 'instant' | 'auto' = 'smooth',
) {
  if (scrollMode === 'infinite') {
    const pageElement = document.querySelector(`[data-page="${page}"]`);
    if (pageElement) {
      pageElement.scrollIntoView({
        behavior,
        block: 'start',
      });
    }
  }
}
