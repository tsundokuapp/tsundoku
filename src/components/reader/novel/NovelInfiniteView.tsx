import { useChapterNovel } from '@/hooks/usePublicApi';
import { useNovelStore } from '@/store/useNovelStore';
import { IFontSizeList } from '@/types/Reader';

interface NovelInfiniteViewProps {
  fontSize: IFontSizeList;
}

export function NovelInfiniteView({ fontSize }: NovelInfiniteViewProps) {
  const { chapterId } = useNovelStore();
  const { data: chapterNovelResponse, isLoading } = useChapterNovel(chapterId!);

  if (!chapterId) return <p>Capítulo não encontrado</p>;

  return (
    <article className="my-4 max-w-[1000px] rounded-lg bg-white px-16 py-16 dark:bg-zinc-800">
      {isLoading ? (
        <p>Carregando...</p>
      ) : (
        <>
          <h1 className="text-center text-3xl font-bold">
            {chapterNovelResponse?.titulo}
          </h1>
          <div
            className={`my-12 ${fontSize}`}
            dangerouslySetInnerHTML={{
              __html: chapterNovelResponse?.conteudoNovel as TrustedHTML,
            }}
          ></div>
        </>
      )}
    </article>
  );
}
