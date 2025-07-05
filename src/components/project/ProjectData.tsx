// Color Checked
// Components Checked
import Image from 'next/image';
import { useEffect } from 'react';

import { IGenres } from '@/@types/Api';
import { TStatusNovel, TStatusComic } from '@/@types/System';
import { useComicStore } from '@/store/useComicStore';

import { CollapseText } from './CollapseText';
import { Tag } from '../common/Tag';

interface ProjectDataProps {
  src: string;
  banner: string;
  title: string;
  altTitle: string;
  description: string;
  status: TStatusNovel | TStatusComic;
  author: string;
  artist: string;
  genres: string[] | IGenres[]; // o retorno da API é um array de strings nesse endpoint
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
  const { setComicBanner } = useComicStore();

  useEffect(() => {
    if (banner) {
      setComicBanner(banner);
    }
  }, [banner]); // eslint-disable-line react-hooks/exhaustive-deps

  const mapStatusToColor = (status: TStatusNovel | TStatusComic) => {
    const statusNormalized = status.toLowerCase();
    switch (statusNormalized) {
      case 'em andamento':
        return 'bg-green-700';
      case 'hiato':
        return 'bg-yellow-700';
      case 'cancelado':
        return 'bg-red-700';
      case 'concluído':
        return 'bg-blue-700';
      default:
        return 'bg-gray-700';
    }
  };

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
        <Image src={src} alt={title} width={240} height={336} />
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
            <span className="font-bold">Status:</span> {status}
            <span
              className={`mx-2 inline-block h-2 w-2 rounded-full ${mapStatusToColor(status)}`}
              data-status={status}
            />
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
