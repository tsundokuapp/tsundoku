import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  const novelRedirect = redirectForNovels(url);
  if (novelRedirect) return novelRedirect;

  const comicRedirect = redirectForComics(url);
  if (comicRedirect) return comicRedirect;

  return NextResponse.next();
}

const redirectForNovels = (url: URL): NextResponse | null => {
  if (url.pathname.startsWith('/novels/')) {
    const parts = url.pathname.split('/');

    if (parts.length === 4) {
      const [, , slug, chapter] = parts;
      const newUrl = new URL(`/reader/novels/${slug}/${chapter}`, url.origin);

      return NextResponse.redirect(newUrl);
    }
  }
  return null;
};

const redirectForComics = (url: URL): NextResponse | null => {
  if (url.pathname.startsWith('/comics/')) {
    const parts = url.pathname.split('/');

    if (parts.length === 4) {
      const [, , slug, chapter] = parts;
      const newUrl = new URL(`/reader/comics/${slug}/${chapter}`, url.origin);

      return NextResponse.redirect(newUrl);
    }
  }
  return null;
};
