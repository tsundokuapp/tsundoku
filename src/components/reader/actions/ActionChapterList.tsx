import { usePathname, useRouter } from 'next/navigation';
import { type ComponentProps } from 'react';

import { DropdownContainer } from '@/components/common/dropdown/DropdownContainer';
import { DropdownOption } from '@/components/common/dropdown/DropdownOption';
import { GenerateChapterList } from '@/helpers/chapterList/GenerateChapterList';

interface ActionChapterListProps extends ComponentProps<'div'> {
  totalChapters: number;
}

export function ActionChapterList({ totalChapters }: ActionChapterListProps) {
  const router = useRouter();

  const pathname = usePathname();
  const projectSlug = pathname.split('/').slice(0, -1).join('/');
  const chapter = pathname.split('/').pop();

  const chapterList = GenerateChapterList({ projectSlug, totalChapters });

  return (
    <DropdownContainer
      label={`${totalChapters} Capítulos`}
      value={`Capítulo ${chapter}`}
    >
      {chapterList.map(({ chapterListItemIndex, chapterListItemUrl }) => {
        return (
          <DropdownOption
            key={chapterListItemIndex}
            label={`Capítulo ${chapterListItemIndex}`}
            value={chapterListItemIndex.toString()}
            action={() => {
              router.push(chapterListItemUrl);
            }}
          />
        );
      })}
    </DropdownContainer>
  );
}
