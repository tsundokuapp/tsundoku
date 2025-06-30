'use client';

import { ArrowLeft, ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { Poppins, Merriweather } from 'next/font/google';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

import {
  IFontFamiliesList,
  IFontLineHeight,
  IFontSizeList,
} from '@/@types/Reader';
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
import { useChapterNovel } from '@/hooks/usePublicApi';

const poppinsFont = Poppins({
  weight: '400',
  subsets: ['latin'],
});

const merriweatherFont = Merriweather({
  weight: '400',
  subsets: ['latin'],
});

export default function NovelReader() {
  const router = useRouter();
  const path = usePathname();
  const slugChapter = path.split('/').pop();
  const slugObra = path.split('/')[3];

  const {
    data: chapterNovelResponse,
    isLoading,
    isError,
  } = useChapterNovel(slugObra, slugChapter!);

  const { toaster } = useToaster();

  const [currentFontSize, setCurrentFontSize] =
    useState<IFontSizeList>('text-base');
  const [currentLineHeight, setCurrentLineHeight] =
    useState<IFontLineHeight>('leading-6');
  const [currentFontFamily, setCurrentFontFamily] = useState(
    poppinsFont.className,
  );

  const handleFontSizeChange = (fontSize: IFontSizeList) => {
    setCurrentFontSize(fontSize);
  };

  const handleLineHeightChange = (lineHeight: IFontLineHeight) => {
    setCurrentLineHeight(lineHeight);
  };

  const handleFontFamilyChange = (fontFamily: IFontFamiliesList) => {
    if (fontFamily === 'Poppins') {
      setCurrentFontFamily(poppinsFont.className);
    }
    if (fontFamily === 'Merriweather') {
      setCurrentFontFamily(merriweatherFont.className);
    }
  };

  const handleNextChapter = () => {
    if (!chapterNovelResponse?.proxima) {
      return toaster({
        type: 'info',
        msg: 'Último capítulo alcançado',
      });
    }
    const idNextChapter = chapterNovelResponse.proxima.split('/').pop();
    const finalLink = `/reader/novels/${slugObra}/${idNextChapter}`;

    router.push(finalLink);
  };

  const handlePreviousChapter = () => {
    if (!chapterNovelResponse?.anterior) {
      return toaster({
        type: 'info',
        msg: 'Último capítulo alcançado',
      });
    }

    const idPreviousChapter = chapterNovelResponse.anterior.split('/').pop();
    const finalLink = `/reader/novels/${slugObra}/${idPreviousChapter}`;

    router.push(finalLink);
  };

  return (
    <div className="relative pb-10">
      <ScrollProgressAnimation onTop>
        <ActionsBarContainer removeList={['reader']} isReader>
          <ActionChapterWithVolumeList />
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
          contentChapter={chapterNovelResponse?.data?.conteudoNovel as string}
          titleChapter={chapterNovelResponse?.data?.titulo as string}
          isLoading={isLoading}
          isError={isError}
        />
      </ReaderContainer>

      {slugChapter && (
        <div className="flex items-center justify-between">
          <Button
            onClick={() => handlePreviousChapter()}
            className="flex items-center gap-2 bg-appBackground text-appText hover:bg-appBackground"
          >
            <ArrowLeft size={24} />
            <p>Anterior</p>
          </Button>

          <Button
            onClick={() => handleNextChapter()}
            className="hover:bg-appBackground/80 flex items-center gap-2 bg-appBackground text-appText"
          >
            <p>Próximo</p>
            <ArrowRight size={24} />
          </Button>
        </div>
      )}
    </div>
  );
}
