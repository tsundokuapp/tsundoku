import { usePathname, useRouter } from 'next/navigation';
import { type ComponentProps } from 'react';

import { DropdownBreakLine } from '@/components/common/dropdown/DropdownBreakLine';
import { DropdownContainer } from '@/components/common/dropdown/DropdownContainer';
import { DropdownOption } from '@/components/common/dropdown/DropdownOption';
import { DropdownText } from '@/components/common/dropdown/DropdownText';
import type { NovelChapterListProps } from '@/fakeApi/novelChapterList';
import { GenerateChapterListWithVolume } from '@/helpers/chapterList/GenerateChapterListWithVolume';

interface ActionChapterListWithVolumeProps extends ComponentProps<'div'> {
  chaptersList: NovelChapterListProps[];
}

export function ActionChapterWithVolumeList({
  chaptersList,
}: ActionChapterListWithVolumeProps) {
  const router = useRouter();

  const pathname = usePathname();
  const projectSlug = pathname.split('/')[3];
  const chapter = pathname.split('/').pop();

  const chapterList = GenerateChapterListWithVolume({
    projectSlug,
    chaptersList,
  });

  return (
    <DropdownContainer
      label={`${chapterList.totalItems} Capítulos`}
      value={`Capítulo ${chapter}`}
    >
      {chapterList.list.map(({ ItemIndex, ItemUrl }) => {
        if (ItemUrl === '#') {
          return (
            <>
              <DropdownText key={ItemIndex} text={`Volume ${ItemIndex}`} />
              <DropdownBreakLine />
            </>
          );
        } else {
          return (
            <DropdownOption
              key={ItemIndex}
              label={`Capítulo ${ItemIndex}`}
              value={ItemIndex.toString()}
              action={() => {
                router.push(ItemUrl);
              }}
            />
          );
        }
      })}
    </DropdownContainer>
  );
}
