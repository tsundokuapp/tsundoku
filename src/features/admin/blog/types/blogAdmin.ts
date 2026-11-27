export interface IAdminBlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  categoryId?: string;
  author: string;
  status: 'Publicado' | 'Rascunho';
  views: number;
  publishedAt: string;
  createdAt: string;
  updatedAt?: string;
}

export interface IAdminBlogCategory {
  id: string;
  descricao: string;
  slug: string;
  author: string;
  createdAt: string;
  postCount?: number;
}

export interface ICreateBlogPostInput {
  title: string;
  slug?: string;
  excerpt?: string;
  content: string;
  coverImage?: string;
  category: string;
  status: 'Publicado' | 'Rascunho';
}

export interface IUpdateBlogPostInput {
  id: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  coverImage?: string;
  category?: string;
  status?: 'Publicado' | 'Rascunho';
}

export interface ICreateBlogCategoryInput {
  descricao: string;
  slug?: string;
}
