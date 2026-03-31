import { Bookmarks } from '@phosphor-icons/react/dist/ssr';
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
      label={
        <>
          <span className="sm:hidden">
            <Bookmarks size={16} />
          </span>
          <span className="hidden sm:inline">{`${totalChapters} Capítulos`}</span>
        </>
      }
      value={
        <>
          <span className="sm:hidden">
            <Bookmarks size={16} />
          </span>
          <span className="hidden sm:inline">{currentChapter}</span>
        </>
      }
      className="min-w-[52px] sm:min-w-[180px]"
      buttonClassname="px-2 sm:px-3 justify-center gap-1 sm:justify-between"
      menuClassname="min-w-[180px]"
      matchTriggerWidth={false}
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
