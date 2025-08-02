'use client';

import { usePathname } from 'next/navigation';

import { ProjectComic } from './ProjectComic';
import { ProjectNovel } from './ProjectNovel';

export default function Project() {
  const pathname = usePathname();
  const worktype = pathname.split('/')[2];

  return (
    <>
      {worktype === 'comic' && <ProjectComic />}
      {worktype === 'novel' && <ProjectNovel />}
    </>
  );
}
