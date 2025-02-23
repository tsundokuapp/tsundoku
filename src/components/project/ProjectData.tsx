// Color Checked
// Components Checked
import Image from 'next/image';

import { IGenres } from '@/@types/Api';
import { TStatusNovel } from '@/@types/System';

import { CollapseText } from './CollapseText';
import { Tag } from '../common/Tag';

interface ProjectDataProps {
  src: string;
  title: string;
  altTitle: string[];
  description: string;
  status: TStatusNovel;
  author: string;
  artist: string;
  genres: IGenres[];
  note?: string;
}

export function ProjectData({
  src,
  title,
  altTitle,
  description,
  genres,
  artist,
  author,
  status,
  note,
}: ProjectDataProps) {
  const mapStatusToColor = (status: TStatusNovel) => {
    switch (status) {
      case 'Em andamento':
        return 'bg-green-700';
      case 'Hiato':
        return 'bg-yellow-700';
      case 'Cancelado':
        return 'bg-red-700';
      case 'Concluído':
        return 'bg-blue-700';
      default:
        return 'bg-gray-700';
    }
  };

  return (
    <article className="group flex flex-row justify-between gap-9">
      <div className="flex-shrink-0 overflow-hidden rounded-md">
        <Image src={src} alt={title} width={240} height={336} />
      </div>
      <div className="flex flex-grow flex-col gap-3">
        <div className="mb-4">
          <h1 className="text-2xl font-bold capitalize">{title}</h1>
          <p className="text-sm text-appSubtitle">
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
          <li className="items-center">
            <span className="font-bold">Status:</span> {status}
            <span
              data-status={status}
              className={`mx-2 inline-block h-2 w-2 rounded-full ${mapStatusToColor(status)}`}
            />
          </li>
        </ul>

        <div>
          <p className="mb-2 text-sm font-bold">Tags:</p>
          <p className="flex flex-row gap-2">
            {genres?.map((genre) => (
              <Tag key={genre.id} text={genre.descricao} />
            ))}
          </p>
        </div>

        {note && (
          <div className="bg-primary mt-4 rounded-md p-4 opacity-80">
            {note}
          </div>
        )}
      </div>
    </article>
  );
}
