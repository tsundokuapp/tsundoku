import React from 'react';

import type { FontSizeList } from '@/@types/FontSizeList';

interface NovelInfiniteViewProps {
  title: string;
  content: string;
  fontSize: FontSizeList;
}

export function NovelInfiniteView({
  title,
  content,
  fontSize,
}: NovelInfiniteViewProps) {
  return (
    <article className="my-4 max-w-[1000px] rounded-lg bg-white px-16 py-16 dark:bg-zinc-800">
      <h1 className="text-center text-3xl font-bold">{title}</h1>
      <div
        className={`my-12 ${fontSize}`}
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    </article>
  );
}
<div />;
