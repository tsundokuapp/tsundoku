import {
  IFontFamiliesList,
  IFontLineHeight,
  IFontSizeList,
} from '@/@types/Reader';
import { cn } from '@/helpers/twUtils';

interface NovelInfiniteViewProps {
  fontSize: IFontSizeList;
  lineHeight: IFontLineHeight;
  fontFamily: IFontFamiliesList | string;
  contentChapter: string;
  titleChapter: string;
  isLoading: boolean;
  isError: boolean;
}

export function NovelInfiniteView({
  fontSize,
  lineHeight,
  fontFamily,
  contentChapter,
  titleChapter,
  isLoading,
  isError,
}: NovelInfiniteViewProps) {
  if (isError) return <p>Capítulo não encontrado</p>;

  const ProcessingContentHTML = ({ content }: { content: string }) => {
    return (
      <div
        className={cn(
          'prose [&_img]:max-w-full" mx-auto my-12 text-center text-appText [&_img]:mx-auto [&_img]:my-8',
          {
            [`${fontSize}`]: fontSize,
            [`${lineHeight}`]: lineHeight,
            [`${fontFamily}`]: fontFamily,
          },
        )}
        dangerouslySetInnerHTML={{
          __html: content as TrustedHTML,
        }}
      />
    );
  };

  return (
    <article className="my-4 max-w-[1000px] rounded-lg bg-appBackground px-16 py-16 text-appText">
      {isLoading ? (
        <p>Carregando...</p>
      ) : (
        <>
          <h1 className="text-center text-3xl font-bold text-appText">
            {titleChapter || 'Capítulo não encontrado'}
          </h1>
          <ProcessingContentHTML content={contentChapter} />
        </>
      )}
    </article>
  );
}
