import {
  IAdminBlogCategory,
  IAdminBlogPost,
  ICreateBlogCategoryInput,
  ICreateBlogPostInput,
  IUpdateBlogPostInput,
} from '../types/blogAdmin';

export function generateSlug(text: string): string {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export const INITIAL_DEV_CATEGORIES: IAdminBlogCategory[] = [
  {
    id: 'cat-1',
    descricao: 'Devaneios',
    slug: 'devaneios',
    author: 'Bravo',
    createdAt: '12/04/2023',
    postCount: 1,
  },
  {
    id: 'cat-2',
    descricao: 'Notícias',
    slug: 'noticias',
    author: 'Bravo',
    createdAt: '12/04/2023',
    postCount: 3,
  },
  {
    id: 'cat-3',
    descricao: 'Entrevistas',
    slug: 'entrevistas',
    author: 'Matface',
    createdAt: '12/04/2023',
    postCount: 1,
  },
  {
    id: 'cat-4',
    descricao: 'Artigos',
    slug: 'artigos',
    author: 'Rlc',
    createdAt: '15/04/2023',
    postCount: 2,
  },
  {
    id: 'cat-5',
    descricao: 'Atualizações',
    slug: 'atualizacoes',
    author: 'NERO_SL',
    createdAt: '20/04/2023',
    postCount: 1,
  },
];

export const INITIAL_DEV_POSTS: IAdminBlogPost[] = [
  {
    id: 'post-1',
    slug: 'lancamento-do-novo-volume-bruxa-errante',
    title: 'Lançamento do Novo Volume de Bruxa Errante',
    excerpt:
      'Confira todos os detalhes do novo volume lançado pela equipe Tsundoku.',
    content:
      '<p>Temos o imenso prazer de anunciar o lançamento do volume mais recente de Bruxa Errante: A Jornada de Elaina!</p>',
    coverImage: '/images/mock/blog/cover1.jpg',
    category: 'Notícias',
    author: 'Bravo',
    status: 'Publicado',
    views: 54200,
    publishedAt: '12/04/2023',
    createdAt: '12/04/2023',
  },
  {
    id: 'post-2',
    slug: 'entrevista-tradutor-mushoku',
    title: 'Entrevista Especial com o Tradutor de Mushoku',
    excerpt:
      'Conversamos com a equipe responsável pela tradução e adaptação da obra.',
    content:
      '<p>Hoje batemos um papo exclusivo com os membros responsáveis por trazer a light novel para o português.</p>',
    coverImage: '/images/mock/blog/cover2.jpg',
    category: 'Entrevistas',
    author: 'Matface',
    status: 'Publicado',
    views: 32100,
    publishedAt: '10/04/2023',
    createdAt: '10/04/2023',
  },
  {
    id: 'post-3',
    slug: 'devaneios-madrugada-filosofia-light-novels',
    title: 'Devaneios da Madrugada: A Filosofia das Light Novels',
    excerpt:
      'Uma reflexão sobre a evolução do formato de light novels e seus subgêneros.',
    content:
      '<p>O que torna uma narrativa em light novel tão fascinante e imersiva para os leitores modernos?</p>',
    coverImage: '/images/mock/blog/cover3.jpg',
    category: 'Devaneios',
    author: 'Rlc',
    status: 'Publicado',
    views: 18500,
    publishedAt: '08/04/2023',
    createdAt: '08/04/2023',
  },
  {
    id: 'post-4',
    slug: 'notas-atualizacao-leitor-v22',
    title: 'Notas de Atualização do Leitor Online V2.2',
    excerpt:
      'Novos controles de leitura, tipografia personalizável e melhorias de performance.',
    content:
      '<p>Apresentamos a versão 2.2 da nossa plataforma web com leitor reformulado.</p>',
    coverImage: '/images/mock/blog/cover4.jpg',
    category: 'Atualizações',
    author: 'NERO_SL',
    status: 'Publicado',
    views: 42900,
    publishedAt: '05/04/2023',
    createdAt: '05/04/2023',
  },
  {
    id: 'post-5',
    slug: 'guia-leitura-eminence-in-shadow',
    title: 'Guia de Leitura: Por Onde Começar em Eminence in Shadow',
    excerpt:
      'Entenda as diferenças entre a Web Novel, Light Novel e Manga da franquia.',
    content:
      '<p>Tudo o que você precisa saber para acompanhar Cid Kagenou em sua jornada das sombras.</p>',
    coverImage: '/images/mock/blog/cover5.jpg',
    category: 'Artigos',
    author: 'Bravo',
    status: 'Publicado',
    views: 61000,
    publishedAt: '02/04/2023',
    createdAt: '02/04/2023',
  },
  {
    id: 'post-6',
    slug: 'novos-projetos-temporada-primavera',
    title: 'Anúncio de Novos Projetos da Temporada de Primavera',
    excerpt: 'Confira as três novas obras licenciadas para tradução em breve.',
    content:
      '<p>Rascunho de anúncio das novas novels e mangás que estão em preparação pela equipe.</p>',
    coverImage: '/images/mock/blog/cover6.jpg',
    category: 'Notícias',
    author: 'Plon',
    status: 'Rascunho',
    views: 0,
    publishedAt: '01/04/2023',
    createdAt: '01/04/2023',
  },
  {
    id: 'post-7',
    slug: 'recrutamento-staff-2023',
    title: 'Recrutamento Staff 2023: Vagas para Tradutores e Revisores',
    excerpt:
      'Junte-se à maior scanlation e editora independente de light novels do Brasil.',
    content:
      '<p>Estamos abrindo novas inscrições para voluntários e parceiros da Tsundoku.</p>',
    coverImage: '/images/mock/blog/cover7.jpg',
    category: 'Notícias',
    author: 'Bravo',
    status: 'Publicado',
    views: 28400,
    publishedAt: '28/03/2023',
    createdAt: '28/03/2023',
  },
  {
    id: 'post-8',
    slug: 'retrospectiva-tsundoku-melhores-lancamentos',
    title: 'Retrospectiva Tsundoku: Melhores Lançamentos',
    excerpt:
      'Os capítulos mais lidos e comentados pelos apoiadores ao longo do último ano.',
    content:
      '<p>Análise editorial dos destaques do ano e agradecimentos especiais aos leitores.</p>',
    coverImage: '/images/mock/blog/cover8.jpg',
    category: 'Artigos',
    author: 'Matface',
    status: 'Rascunho',
    views: 120,
    publishedAt: '25/03/2023',
    createdAt: '25/03/2023',
  },
];

let devPosts: IAdminBlogPost[] = [...INITIAL_DEV_POSTS];
let devCategories: IAdminBlogCategory[] = [...INITIAL_DEV_CATEGORIES];

export function resetBlogDevState() {
  devPosts = [...INITIAL_DEV_POSTS];
  devCategories = [...INITIAL_DEV_CATEGORIES];
}

export function getDevPosts(): IAdminBlogPost[] {
  return [...devPosts];
}

export function getDevPostBySlug(slug: string): IAdminBlogPost | undefined {
  return devPosts.find((p) => p.slug === slug || p.id === slug);
}

export function addDevPost(
  input: ICreateBlogPostInput,
  author = 'Admin',
): IAdminBlogPost {
  const slug = input.slug
    ? generateSlug(input.slug)
    : generateSlug(input.title);
  const now = new Date().toLocaleDateString('pt-BR');
  const newPost: IAdminBlogPost = {
    id: `post-${Date.now()}`,
    slug,
    title: input.title,
    excerpt: input.excerpt || '',
    content: input.content || '',
    coverImage: input.coverImage || '/images/mock/blog/cover-default.jpg',
    category: input.category || 'Geral',
    author,
    status: input.status,
    views: 0,
    publishedAt: input.status === 'Publicado' ? now : '-',
    createdAt: now,
  };
  devPosts = [newPost, ...devPosts];
  return newPost;
}

export function updateDevPost(input: IUpdateBlogPostInput): IAdminBlogPost {
  const index = devPosts.findIndex(
    (p) => p.id === input.id || p.slug === input.slug,
  );
  if (index === -1) {
    throw new Error('Post não encontrado');
  }

  const existing = devPosts[index];
  const updatedSlug = input.slug
    ? generateSlug(input.slug)
    : input.title
      ? generateSlug(input.title)
      : existing.slug;

  const updated: IAdminBlogPost = {
    ...existing,
    title: input.title !== undefined ? input.title : existing.title,
    slug: updatedSlug,
    excerpt: input.excerpt !== undefined ? input.excerpt : existing.excerpt,
    content: input.content !== undefined ? input.content : existing.content,
    coverImage:
      input.coverImage !== undefined ? input.coverImage : existing.coverImage,
    category: input.category !== undefined ? input.category : existing.category,
    status: input.status !== undefined ? input.status : existing.status,
    updatedAt: new Date().toLocaleDateString('pt-BR'),
  };

  devPosts = [
    ...devPosts.slice(0, index),
    updated,
    ...devPosts.slice(index + 1),
  ];
  return updated;
}

export function deleteDevPost(idOrSlug: string): boolean {
  const initialLength = devPosts.length;
  devPosts = devPosts.filter((p) => p.id !== idOrSlug && p.slug !== idOrSlug);
  return devPosts.length < initialLength;
}

export function getDevCategories(): IAdminBlogCategory[] {
  return [...devCategories];
}

export function addDevCategory(
  input: ICreateBlogCategoryInput,
  author = 'Admin',
): IAdminBlogCategory {
  const slug = input.slug
    ? generateSlug(input.slug)
    : generateSlug(input.descricao);
  const existing = devCategories.find(
    (c) =>
      c.slug === slug ||
      c.descricao.toLowerCase() === input.descricao.trim().toLowerCase(),
  );
  if (existing) {
    throw new Error('Esta categoria já existe.');
  }

  const now = new Date().toLocaleDateString('pt-BR');
  const newCat: IAdminBlogCategory = {
    id: `cat-${Date.now()}`,
    descricao: input.descricao.trim(),
    slug,
    author,
    createdAt: now,
    postCount: 0,
  };
  devCategories = [...devCategories, newCat];
  return newCat;
}

export function updateDevCategory(
  id: string,
  descricao: string,
): IAdminBlogCategory {
  const index = devCategories.findIndex((c) => c.id === id || c.slug === id);
  if (index === -1) {
    throw new Error('Categoria não encontrada');
  }

  const existing = devCategories[index];
  const slug = generateSlug(descricao);
  const updated: IAdminBlogCategory = {
    ...existing,
    descricao: descricao.trim(),
    slug,
  };

  devCategories = [
    ...devCategories.slice(0, index),
    updated,
    ...devCategories.slice(index + 1),
  ];
  return updated;
}

export function deleteDevCategory(idOrSlug: string): boolean {
  const initialLength = devCategories.length;
  devCategories = devCategories.filter(
    (c) => c.id !== idOrSlug && c.slug !== idOrSlug,
  );
  return devCategories.length < initialLength;
}
