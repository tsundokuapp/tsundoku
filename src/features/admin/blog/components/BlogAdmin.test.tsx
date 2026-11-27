import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import * as devMock from '@/features/admin/utils/devMock';
import { ToasterProvider } from '@/shared/contexts/ToasterContext';

import { BlogCategoryGrid } from './BlogCategoryGrid';
import { BlogCategoryTable } from './BlogCategoryTable';
import { BlogPostCard } from './BlogPostCard';
import { BlogPostForm } from './BlogPostForm';
import { BlogPostMobileCard } from './BlogPostMobileCard';
import { BlogPostTable } from './BlogPostTable';
import { IAdminBlogCategory, IAdminBlogPost } from '../types/blogAdmin';
import { resetBlogDevState } from '../utils/blogDevMock';

jest.mock('@/features/admin/utils/devMock', () => {
  const actual = jest.requireActual('@/features/admin/utils/devMock');
  return {
    ...actual,
    isDevEnvironment: jest.fn(() => true),
  };
});

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  usePathname: () => '/admin/posts',
}));

function renderWithProviders(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <ToasterProvider>{ui}</ToasterProvider>
    </QueryClientProvider>,
  );
}

const mockPost: IAdminBlogPost = {
  id: 'post-test-1',
  slug: 'artigo-exemplo-teste',
  title: 'Artigo Exemplo para Testes',
  excerpt: 'Resumo do artigo exemplo',
  content: '<p>Conteúdo do artigo exemplo</p>',
  coverImage: '/images/mock/blog/cover1.jpg',
  category: 'Notícias',
  author: 'Bravo',
  status: 'Publicado',
  views: 1250,
  publishedAt: '12/04/2023',
  createdAt: '12/04/2023',
};

const mockCategories: IAdminBlogCategory[] = [
  {
    id: 'cat-1',
    descricao: 'Devaneios',
    slug: 'devaneios',
    author: 'Bravo',
    createdAt: '12/04/2023',
    postCount: 5,
  },
  {
    id: 'cat-2',
    descricao: 'Notícias',
    slug: 'noticias',
    author: 'Bravo',
    createdAt: '12/04/2023',
    postCount: 12,
  },
];

describe('Blog Admin Components', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    resetBlogDevState();
    (devMock.isDevEnvironment as jest.Mock).mockReturnValue(true);
  });

  describe('BlogPostCard (Figma 1302:35348)', () => {
    it('renders post cover, title, category, status and quick action buttons', () => {
      renderWithProviders(<BlogPostCard post={mockPost} />);

      expect(
        screen.getByText('Artigo Exemplo para Testes'),
      ).toBeInTheDocument();
      expect(screen.getByText('Notícias')).toBeInTheDocument();
      expect(screen.getByText('Publicado')).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /índice/i })).toHaveAttribute(
        'href',
        '/blog?post=artigo-exemplo-teste',
      );
      expect(screen.getByRole('link', { name: /editar/i })).toHaveAttribute(
        'href',
        '/admin/posts/artigo-exemplo-teste',
      );
    });
  });

  describe('BlogPostMobileCard (Figma 1321:35631)', () => {
    it('renders compact touch-friendly mobile card layout', () => {
      renderWithProviders(<BlogPostMobileCard post={mockPost} />);

      expect(
        screen.getByText('Artigo Exemplo para Testes'),
      ).toBeInTheDocument();
      expect(screen.getByTitle('Visualizar Artigo')).toBeInTheDocument();
      expect(screen.getByTitle('Editar Artigo')).toBeInTheDocument();
    });
  });

  describe('BlogPostTable (Figma 1192:563)', () => {
    it('renders tabular rows with columns and quick action icons', () => {
      renderWithProviders(<BlogPostTable posts={[mockPost]} />);

      expect(
        screen.getByText('Artigo Exemplo para Testes'),
      ).toBeInTheDocument();
      expect(screen.getByText('Bravo')).toBeInTheDocument();
      expect(screen.getByText('1.250')).toBeInTheDocument();
      expect(screen.getByTitle('Editar Post')).toBeInTheDocument();
    });
  });

  describe('BlogPostForm (Figma 1268:30273 / 1258:113373)', () => {
    it('generates slug automatically when typing title in create mode', () => {
      renderWithProviders(<BlogPostForm isEdit={false} />);

      const titleInput = screen.getByPlaceholderText('Adicionar título post');
      const slugInput = screen.getByPlaceholderText('slug-do-post');

      fireEvent.change(titleInput, {
        target: { value: 'Meu Novo Post Especial' },
      });

      expect(slugInput).toHaveValue('meu-novo-post-especial');
    });

    it('populates fields in edit mode and displays update/delete buttons', () => {
      renderWithProviders(
        <BlogPostForm isEdit={true} initialData={mockPost} />,
      );

      expect(
        screen.getByDisplayValue('Artigo Exemplo para Testes'),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /atualizar/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /excluir/i }),
      ).toBeInTheDocument();
    });
  });

  describe('BlogCategoryGrid & BlogCategoryTable (Figma 1268:29867 / 1203:423)', () => {
    it('renders category chips with counts in grid view', () => {
      renderWithProviders(
        <BlogCategoryGrid
          categories={mockCategories}
          activeCategory="Devaneios"
        />,
      );

      expect(screen.getByText('Devaneios')).toBeInTheDocument();
      expect(screen.getByText('Notícias')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
      expect(screen.getByText('12')).toBeInTheDocument();
    });

    it('renders category table with authors and dates', () => {
      renderWithProviders(<BlogCategoryTable categories={mockCategories} />);

      expect(screen.getByText('Devaneios')).toBeInTheDocument();
      expect(screen.getAllByText('Bravo')).toHaveLength(2);
      expect(screen.getAllByText('12/04/2023')).toHaveLength(2);
    });
  });
});
