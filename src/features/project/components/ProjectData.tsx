import Image from 'next/image';
import { useEffect } from 'react';

import { useBannerStore } from '@/shared/stores/useBannerStore';
import { IGenres } from '@/shared/types/common';
import { TStatusNovel, TStatusComic } from '@/shared/types/system';
import { GetBadgeByStatusProject } from '@/shared/utils/GetBagde';
import { BLUR_DATA_URL } from '@/shared/utils/image';

import { CollapseText } from './CollapseText';
import { Tag } from '../../../shared/components/ui/Tag';

interface ProjectDataProps {
  src: string;
  banner: string;
  title: string;
  altTitle: string;
  description: string;
  status: TStatusNovel | TStatusComic;
  author: string;
  artist: string;
  genres: string[] | IGenres[];
  note?: string;
}

export function ProjectData({
  src,
  banner,
  title,
  altTitle,
  description,
  genres,
  artist,
  author,
  status,
  note,
}: ProjectDataProps) {
  const { setBanner } = useBannerStore();

  useEffect(() => {
    if (banner) {
      setBanner(banner);
    }
  }, [banner]); // eslint-disable-line react-hooks/exhaustive-deps

  const renderGenres = (genres: string[] | IGenres[]) => {
    if (!genres || genres.length === 0) return null;

    return (
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-bold">Gêneros:</span>
        {genres.map((genre) => (
          <Tag
            key={typeof genre === 'string' ? genre : genre.slug}
            text={typeof genre === 'string' ? genre : genre.descricao}
          />
        ))}
      </div>
    );
  };

  return (
    <article className="group flex flex-col items-center justify-between gap-6 md:flex-row md:items-start md:gap-6">
      <div className="flex-shrink-0 overflow-hidden rounded-md">
        <Image
          src={src}
          alt={title}
          width={240}
          height={336}
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
        />
      </div>
      <div className="flex flex-grow flex-col gap-3 p-4 pt-0">
        <div className="mb-4">
          <h1 className="text-center text-2xl font-bold capitalize md:text-start">
            {title}
          </h1>
          <p className="text-center text-sm text-appSubtitle md:text-start">
            <span className="capitalize">{altTitle}</span>
          </p>
        </div>

        <CollapseText>{description}</CollapseText>

        <ul className="flex flex-row items-center gap-8 text-sm">
          <li>
            <span className="font-bold">Autor:</span> {author}
          </li>
          <li>
            <span className="font-bold">Artista:</span> {artist}
          </li>
          <li className="inline-block flex-wrap items-center">
            <GetBadgeByStatusProject status={status} />
          </li>
        </ul>

        {renderGenres(genres)}

        {note && (
          <div className="mt-4 rounded-md bg-appHeaderHighlight p-4 opacity-80">
            {note}
          </div>
        )}
      </div>
    </article>
  );
}
