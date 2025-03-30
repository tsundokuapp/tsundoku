import { usePathname } from 'next/navigation';

import {
  IFontFamiliesList,
  IFontLineHeight,
  IFontSizeList,
} from '@/@types/Reader';
import { useChapterNovel } from '@/hooks/usePublicApi';
// import { useNovelStore } from '@/store/useNovelStore';

interface NovelInfiniteViewProps {
  fontSize: IFontSizeList;
  lineHeight: IFontLineHeight;
  fontFamily: IFontFamiliesList;
}

export function NovelInfiniteView({
  fontSize,
  lineHeight,
  fontFamily,
}: NovelInfiniteViewProps) {
  // const { chapterId } = useNovelStore();

  const path = usePathname();
  const idChapter = path.split('/').pop();
  const slugObra = path.split('/')[3];

  const { data: chapterNovelResponse, isLoading } = useChapterNovel(
    slugObra,
    idChapter!,
  );

  if (!idChapter) return <p>Capítulo não encontrado</p>;

  return (
    <article className="my-4 max-w-[1000px] rounded-lg bg-appBackground px-16 py-16 text-appText">
      {isLoading ? (
        <p>Carregando...</p>
      ) : (
        <>
          <h1 className="text-center text-3xl font-bold text-appText">
            {chapterNovelResponse?.data.titulo}
          </h1>
          <div
            className={`my-12 text-appText ${fontSize} ${lineHeight} font-${fontFamily}`}
            dangerouslySetInnerHTML={{
              __html: chapterNovelResponse?.data.conteudoNovel as TrustedHTML,
            }}
          ></div>
        </>
      )}
    </article>
  );
}
