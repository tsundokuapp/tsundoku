import { useRouter } from 'next/navigation';
import { type ComponentProps } from 'react';

import { IChapterData } from '@/features/comics/types/IChapterData';
import { DropdownContainer } from '@/shared/components/ui/dropdown/DropdownContainer';
import { DropdownOption } from '@/shared/components/ui/dropdown/DropdownOption';

interface ActionChapterListProps extends ComponentProps<'div'> {
  totalChapters: number;
  currentChapter: string;
  chapterList: IChapterData[];
}

export function ActionChapterList({
  totalChapters,
  currentChapter,
  chapterList,
}: ActionChapterListProps) {
  const router = useRouter();

  return (
    <DropdownContainer
      label={`${totalChapters} Capítulos`}
      value={currentChapter}
    >
      {chapterList.map((chapter) => {
        return (
          <DropdownOption
            key={chapter.id}
            label={chapter.descritivoCapitulo}
            value={chapter.id}
            action={() => {
              router.push(chapter.slug);
            }}
            selected={chapter.slug.replace(/-/g, ' ') === currentChapter}
          />
        );
      })}
    </DropdownContainer>
  );
}
