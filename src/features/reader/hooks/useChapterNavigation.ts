import { useRouter } from 'next/navigation';

import { useToaster } from '@/shared/contexts/ToasterContext';

export function useChapterNavigation(type: 'novels' | 'comics', slug: string) {
  const router = useRouter();
  const { toaster } = useToaster();

  const finalLink = `/reader/${type}/${slug}/`;

  const goToNext = (nextUrl: string | null) => {
    if (!nextUrl) {
      return toaster({
        type: 'info',
        msg: 'Último capítulo alcançado',
      });
    }
    const idNextChapter = nextUrl.split('/').pop();
    const finalLinkWithId = `${finalLink}${idNextChapter}`;

    router.push(finalLinkWithId);
  };
  const goToPrevious = (prevUrl: string | null) => {
    if (!prevUrl) {
      return toaster({
        type: 'info',
        msg: 'Último capítulo alcançado',
      });
    }

    const idPreviousChapter = prevUrl.split('/').pop();
    const finalLinkWithId = `${finalLink}${idPreviousChapter}`;

    router.push(finalLinkWithId);
  };

  return { goToNext, goToPrevious };
}
