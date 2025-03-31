import {
  IFontFamiliesList,
  IFontLineHeight,
  IFontSizeList,
} from '@/@types/Reader';

interface NovelInfiniteViewProps {
  fontSize: IFontSizeList;
  lineHeight: IFontLineHeight;
  fontFamily: IFontFamiliesList;
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

  return (
    <article className="my-4 max-w-[1000px] rounded-lg bg-appBackground px-16 py-16 text-appText">
      {isLoading ? (
        <p>Carregando...</p>
      ) : (
        <>
          <h1 className="text-center text-3xl font-bold text-appText">
            {titleChapter || 'Capítulo não encontrado'}
          </h1>
          <div
            className={`my-12 text-appText ${fontSize} ${lineHeight} font-${fontFamily}`}
            dangerouslySetInnerHTML={{
              __html: contentChapter as TrustedHTML,
            }}
          ></div>
        </>
      )}
    </article>
  );
}
