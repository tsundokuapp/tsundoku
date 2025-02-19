import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  if (url.pathname.startsWith('/novels/')) {
    const parts = url.pathname.split('/');

    if (parts.length === 5) {
      const [_, novels, slug, volume, chapter] = parts;

      url.pathname = `/reader/novels/${slug}/${volume}/${chapter}`;

      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}
