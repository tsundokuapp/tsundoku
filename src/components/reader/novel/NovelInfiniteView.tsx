import Image from 'next/image';

import { IIlustrationUrls } from '@/@types/Api';
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
  isIlustration?: boolean;
  ilustrationsUrl?: IIlustrationUrls[];
  isLoading: boolean;
  isError: boolean;
}

export function NovelInfiniteView({
  fontSize,
  lineHeight,
  fontFamily,
  contentChapter,
  titleChapter,
  isIlustration,
  ilustrationsUrl,
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

  const ProcessingContentIllustration = ({
    ilustrations,
    className,
  }: {
    ilustrations: IIlustrationUrls[];
    className?: string;
  }) => {
    return (
      <div
        className={cn(
          'prose prose-img:mx-auto prose-img:my-8 prose-img:max-w-full',
          className,
        )}
      >
        {ilustrations.map((ilustration) => (
          <div key={ilustration.id} className="my-4">
            <Image
              width={1024}
              height={768}
              priority
              src={ilustration.url}
              alt={ilustration.alt}
              className="mx-auto max-w-full"
            />
          </div>
        ))}
      </div>
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
          {isIlustration ? (
            <ProcessingContentIllustration
              ilustrations={ilustrationsUrl!}
              className="my-8"
            />
          ) : (
            <ProcessingContentHTML content={contentChapter} />
          )}
        </>
      )}
    </article>
  );
}
