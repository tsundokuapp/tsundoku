'use client';
import { useState } from 'react';

import type { FontSizeList } from '@/@types/FontSizeList';
import { ActionsBarContainer } from '@/components/reader/ActionsBarContainer';
import { ReaderContainer } from '@/components/reader/ReaderContainer';
import { ActionChapterWithVolumeList } from '@/components/reader/actions/ActionChapterListWithVolume';
import { ActionFontSizeControl } from '@/components/reader/actions/ActionFontSizeControl';
import { NovelInfiniteView } from '@/components/reader/novel/NovelInifiniteView';
import { fakeNovelChapter } from '@/fakeApi/novelChapter';
import { fakeNovelChapterList } from '@/fakeApi/novelChapterList';

// interface NovelReaderProps {
//   params: {
//     volume: string;
//     champter: string;
//   };
// }

export default function NovelReader() {
  const { title, content } = fakeNovelChapter;
  const chapterList = fakeNovelChapterList;

  const [currentFontSize, setCurrentFontSize] =
    useState<FontSizeList>('text-base');

  const handleFontSizeChange = (fontSize: FontSizeList) => {
    setCurrentFontSize(fontSize);
  };

  return (
    <div className="relative">
      <ActionsBarContainer
        sufixList={['Volume', 'Capítulo']}
        removeList={['reader']}
      >
        <ActionChapterWithVolumeList chaptersList={chapterList} />
        <ActionFontSizeControl onChange={handleFontSizeChange} />
      </ActionsBarContainer>

      <ReaderContainer>
        <NovelInfiniteView
          title={title}
          content={content}
          fontSize={currentFontSize}
        />
      </ReaderContainer>

      {/* <ProgressBar
        totalSteps={images.length}
        progressStep={currentPage}
        scrollMode={scrollMode}
        onPageChange={handlePageChange}
      /> */}
    </div>
  );
}
