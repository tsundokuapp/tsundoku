'use client';

import { ArrowLeft, ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import ScrollProgressAnimation from '@/animation/ScrollProgressAnimation';
import { Button } from '@/components/common/button/Button';
import { ActionsBarContainer } from '@/components/reader/ActionsBarContainer';
import { ReaderContainer } from '@/components/reader/ReaderContainer';
import { ActionChapterWithVolumeList } from '@/components/reader/actions/ActionChapterListWithVolume';
import { ActionFontFamilyControl } from '@/components/reader/actions/ActionFontFamilyControl';
import { ActionFontLineHeightControl } from '@/components/reader/actions/ActionFontLineHeightControl/ActionFontLineHeightControl';
import { ActionFontSizeControl } from '@/components/reader/actions/ActionFontSizeControl';
import { NovelInfiniteView } from '@/components/reader/novel/NovelInfiniteView';
import { useToaster } from '@/contexts/ToasterContext';
import { useNovelNavigation } from '@/hooks/useNovelNavigation';
import { useNovelStore } from '@/store/useNovelStore';
import {
  IFontFamiliesList,
  IFontLineHeight,
  IFontSizeList,
} from '@/types/Reader';

export default function NovelReader() {
  const { volumeList, setChapterId, chapterId } = useNovelStore();
  const { getNextChapter, getPreviousChapter } = useNovelNavigation();
  const { toaster } = useToaster();
  const router = useRouter();

  const [currentFontSize, setCurrentFontSize] =
    useState<IFontSizeList>('text-base');
  const [currentLineHeight, setCurrentLineHeight] =
    useState<IFontLineHeight>('leading-6');
  const [currentFontFamily, setCurrentFontFamily] =
    useState<IFontFamiliesList>('Poppins');

  const handleFontSizeChange = (fontSize: IFontSizeList) => {
    setCurrentFontSize(fontSize);
  };

  const handleLineHeightChange = (lineHeight: IFontLineHeight) => {
    setCurrentLineHeight(lineHeight);
  };

  const handleFontFamilyChange = (fontFamily: IFontFamiliesList) => {
    setCurrentFontFamily(fontFamily);
  };

  const handleNextChapter = () => {
    const data = getNextChapter();
    if (!data) {
      return toaster({
        type: 'info',
        msg: 'Último capítulo alcançado',
      });
    }

    setChapterId(data.nextChapterId);
    router.push(data.nextUrl);
  };

  const handlePreviousChapter = () => {
    const data = getPreviousChapter();
    if (!data) {
      return toaster({
        type: 'info',
        msg: 'Último capítulo alcançado',
      });
    }

    setChapterId(data.previousChapterId);
    router.push(data.previousUrl);
  };

  return (
    <div className="relative pb-10">
      <ScrollProgressAnimation onTop>
        <ActionsBarContainer removeList={['reader']} isReader>
          <ActionChapterWithVolumeList volumesList={volumeList!} />
          <ActionFontFamilyControl onChange={handleFontFamilyChange} />
          <ActionFontSizeControl onChange={handleFontSizeChange} />
          <ActionFontLineHeightControl onChange={handleLineHeightChange} />
        </ActionsBarContainer>
      </ScrollProgressAnimation>

      <ReaderContainer>
        <NovelInfiniteView
          fontSize={currentFontSize}
          lineHeight={currentLineHeight}
          fontFamily={currentFontFamily}
        />
      </ReaderContainer>

      {chapterId && (
        <div className="flex items-center justify-between">
          <Button
            onClick={() => handlePreviousChapter()}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={24} />
            <p>Anterior</p>
          </Button>

          <Button
            onClick={() => handleNextChapter()}
            className="flex items-center gap-2"
          >
            <p>Próximo</p>
            <ArrowRight size={24} />
          </Button>
        </div>
      )}
    </div>
  );
}
