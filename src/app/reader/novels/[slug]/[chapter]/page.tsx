'use client';

import { ArrowLeft, ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { Merriweather, Poppins } from 'next/font/google';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

import { useChapterNovel } from '@/features/novels/hooks/usePublicNovels';
import { ActionsBar } from '@/features/reader/components/ActionsBar';
import { ActionChapterWithVolumeList } from '@/features/reader/components/ActionsBar/ActionChapterListWithVolume';
import { ReaderContainer } from '@/features/reader/components/ReaderContainer';
import { ActionFontFamilyControl } from '@/features/reader/components/controls/ActionFontFamilyControl';
import { ActionFontLineHeightControl } from '@/features/reader/components/controls/ActionFontLineHeightControl';
import { ActionFontSizeControl } from '@/features/reader/components/controls/ActionFontSizeControl';
import { NovelInfiniteView } from '@/features/reader/components/novel/NovelInfiniteView';
import { useChapterNavigation } from '@/features/reader/hooks/useChapterNavigation';
import { useReaderPreferences } from '@/features/reader/stores/useReaderPreferences';
import ScrollProgressAnimation from '@/shared/animations/ScrollProgressAnimation';
import { NoContent } from '@/shared/components/feedback/noContent';
import { Button } from '@/shared/components/ui/button/Button';

interface PageProps {
  params: { slug: string; chapter: string };
}

const poppinsFont = Poppins({
  weight: '400',
  subsets: ['latin'],
});

const merriweatherFont = Merriweather({
  weight: '400',
  subsets: ['latin'],
});

const fontFamilyMap = {
  Poppins: poppinsFont.className,
  Merriweather: merriweatherFont.className,
} as const;

export default function NovelReader({ params }: PageProps) {
  const { slug: slugObra, chapter: slugChapter } = params;
  const router = useRouter();

  const {
    data: response,
    isLoading,
    isError,
  } = useChapterNovel(slugObra, slugChapter!);

  const { goToNext, goToPrevious } = useChapterNavigation('novels', slugObra);

  const {
    fontSize,
    lineHeight,
    fontFamily,
    setFontSize,
    setLineHeight,
    setFontFamily,
  } = useReaderPreferences();

  const currentFontFamilyClass = useMemo(
    () => fontFamilyMap[fontFamily],
    [fontFamily],
  );

  const chapterNovel = response?.ok ? response.data : undefined;
  const hasError = response && !response.ok;

  if (hasError) {
    return <NoContent msg="Erro ao carregar a novel. Tente novamente." />;
  }

  return (
    <div className="relative pb-10 pt-[88px]">
      <ScrollProgressAnimation onTop>
        <ActionsBar removeList={['reader']} isReader>
          <ActionChapterWithVolumeList />
          <ActionFontFamilyControl onChange={setFontFamily} />
          <ActionFontSizeControl onChange={setFontSize} />
          <ActionFontLineHeightControl onChange={setLineHeight} />
        </ActionsBar>
      </ScrollProgressAnimation>

      <ReaderContainer>
        <NovelInfiniteView
          fontSize={fontSize}
          lineHeight={lineHeight}
          fontFamily={currentFontFamilyClass}
          contentChapter={chapterNovel?.data?.conteudoNovel as string}
          titleChapter={chapterNovel?.data?.titulo as string}
          isIlustration={chapterNovel?.data?.ehIlustracoesNovel}
          ilustrationsUrl={chapterNovel?.data?.listaImagens}
          isLoading={isLoading}
          isError={isError}
        />
      </ReaderContainer>

      {slugChapter && (
        <div className="flex items-center justify-between">
          {chapterNovel?.anterior && (
            <Button
              onClick={() => goToPrevious(chapterNovel.anterior)}
              className="flex items-center gap-2 border border-appButtonBorder bg-appBackground text-appText hover:bg-appBackground"
            >
              <ArrowLeft size={24} />
              <p>Anterior</p>
            </Button>
          )}

          {chapterNovel?.proxima ? (
            <Button
              onClick={() => goToNext(chapterNovel?.proxima)}
              className="hover:bg-appBackground/80 flex items-center gap-2 border border-appButtonBorder bg-appBackground text-appText"
            >
              <p>Próximo</p>
              <ArrowRight size={24} />
            </Button>
          ) : (
            <Button
              onClick={() => router.push(`/novels/${slugObra}`)}
              className="hover:bg-appBackground/80 flex items-center gap-2 text-nowrap border border-appButtonBorder bg-appBackground text-appText"
            >
              <p>Retornar para obra</p>
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
