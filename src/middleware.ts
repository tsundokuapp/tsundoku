// Descomentar apenas se estiver usando o Vercel Edge Config, para evitar erros no console
// import { get } from '@vercel/edge-config';
import { NextRequest, NextResponse } from 'next/server';

export const config = {
  // matcher para todas as rotas
  matcher: '/(.*)',
};

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // if (process.env.NEXT_PUBLIC_IS_PRODUCTION === 'true') {
  //   isInMaintenanceMode(req);
  // }

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

const isInMaintenanceMode = async (req: NextRequest) => {
  // Verifica se a aplicação está em modo de manutenção
  const isInMaintenanceMode = await get<boolean>('isInMaintenanceMode');

  if (isInMaintenanceMode) {
    req.nextUrl.pathname = `/maintenance`;

    return NextResponse.rewrite(req.nextUrl);
  }
};
