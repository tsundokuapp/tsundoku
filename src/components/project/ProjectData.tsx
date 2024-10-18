import Image from 'next/image';

import { CollapseText } from './CollapseText';
import { Tag } from '../common/Tag';

interface ProjectDataProps {
  src: string;
  title: string;
  altTitle: string[];
  description: string;
  status: 'Em andamento' | 'Em hiato' | 'Cancelado' | 'Concluído';
  author: string;
  artist: string;
  tags: string[];
}

export function ProjectData({
  src,
  title,
  altTitle,
  description,
  tags,
  artist,
  author,
  status,
}: ProjectDataProps) {
  title = title.replace(/-/g, ' ');
  return (
    <article className="group flex flex-row justify-between gap-9">
      <div className="flex-shrink-0 overflow-hidden rounded-md">
        <Image src={src} alt={title} width={240} height={336} />
      </div>
      <div className="flex flex-grow flex-col gap-3">
        <div className="mb-4">
          <h1 className="text-2xl font-bold capitalize">{title}</h1>
          <p className="text-sm">
            {altTitle.map((title, index) => (
              <span key={title} className="capitalize">
                {title}
                {index < altTitle.length - 1 && ' / '}
              </span>
            ))}
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
              className="mx-2 inline-block h-2 w-2 rounded-full bg-green-700"
            />
          </li>
        </ul>

        <div>
          <p className="mb-2 text-sm font-bold">Tags:</p>
          <p className="flex flex-row gap-2">
            {tags.map((tag) => (
              <Tag key={tag} text={tag} />
            ))}
          </p>
        </div>
      </div>
    </article>
  );
}
