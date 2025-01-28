'use client';
import { useState } from 'react';

import ScrollProgressAnimation from '@/animation/ScrollProgressAnimation';
import { ActionsBarContainer } from '@/components/reader/ActionsBarContainer';
import { ReaderContainer } from '@/components/reader/ReaderContainer';
import { ActionChapterWithVolumeList } from '@/components/reader/actions/ActionChapterListWithVolume';
import { ActionFontSizeControl } from '@/components/reader/actions/ActionFontSizeControl';
import { NovelInfiniteView } from '@/components/reader/novel/NovelInfiniteView';
import { useNovelStore } from '@/store/useNovelStore';
import { IFontSizeList } from '@/types/Reader';

export default function NovelReader() {
  const { volumeList } = useNovelStore();
  const [currentFontSize, setCurrentFontSize] =
    useState<IFontSizeList>('text-base');

  const handleFontSizeChange = (fontSize: IFontSizeList) => {
    setCurrentFontSize(fontSize);
  };

  return (
    <div className="relative">
      <ScrollProgressAnimation onTop>
        <ActionsBarContainer removeList={['reader']} isReader>
          <ActionChapterWithVolumeList volumesList={volumeList!} />
          <ActionFontSizeControl onChange={handleFontSizeChange} />
        </ActionsBarContainer>
      </ScrollProgressAnimation>

      <ReaderContainer>
        <NovelInfiniteView fontSize={currentFontSize} />
      </ReaderContainer>
    </div>
  );
}
