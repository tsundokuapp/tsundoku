import * as devMock from '@/features/admin/utils/devMock';

jest.mock('@/features/admin/utils/devMock', () => {
  const actual = jest.requireActual('@/features/admin/utils/devMock');
  return {
    ...actual,
    isDevEnvironment: jest.fn(() => true),
  };
});

import {
  createAdminBlogCategory,
  createAdminBlogPost,
  deleteAdminBlogCategory,
  deleteAdminBlogPost,
  getAdminBlogCategories,
  getAdminBlogPostBySlug,
  getAdminBlogPosts,
  updateAdminBlogCategory,
  updateAdminBlogPost,
} from './blogAdminApi';
import { resetBlogDevState } from '../utils/blogDevMock';

describe('blogAdminApi (R3 Isolation & CRUD)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    resetBlogDevState();
    (devMock.isDevEnvironment as jest.Mock).mockReturnValue(true);
  });

  describe('Requirement R3 Isolation in Production', () => {
    beforeEach(() => {
      (devMock.isDevEnvironment as jest.Mock).mockReturnValue(false);
    });

    it('returns empty list and unavailable status for blog posts in production', async () => {
      const res = await getAdminBlogPosts();
      expect(res.data).toEqual([]);
      expect(res.isUnavailable).toBe(true);
      expect(res.unavailableReason).toContain('servidor de produção');
    });

    it('returns null for post by slug in production', async () => {
      const res = await getAdminBlogPostBySlug('any-slug');
      expect(res.post).toBeNull();
      expect(res.isUnavailable).toBe(true);
    });

    it('blocks post creation in production', async () => {
      const res = await createAdminBlogPost({
        title: 'New Post',
        content: 'Content',
        category: 'Notícias',
        status: 'Publicado',
      });
      expect(res.success).toBe(false);
      expect(res.message).toContain('indisponível no ambiente de produção');
    });

    it('blocks post updating in production', async () => {
      const res = await updateAdminBlogPost({
        id: 'post-1',
        title: 'Updated Post',
      });
      expect(res.success).toBe(false);
      expect(res.message).toContain('indisponível no ambiente de produção');
    });

    it('blocks post deletion in production', async () => {
      const res = await deleteAdminBlogPost('post-1');
      expect(res.success).toBe(false);
      expect(res.message).toContain('indisponível no ambiente de produção');
    });

    it('returns empty list and unavailable status for categories in production', async () => {
      const res = await getAdminBlogCategories();
      expect(res.data).toEqual([]);
      expect(res.isUnavailable).toBe(true);
    });

    it('blocks category mutation in production', async () => {
      const createRes = await createAdminBlogCategory({ descricao: 'Nova' });
      expect(createRes.success).toBe(false);

      const updateRes = await updateAdminBlogCategory('cat-1', 'Atualizada');
      expect(updateRes.success).toBe(false);

      const deleteRes = await deleteAdminBlogCategory('cat-1');
      expect(deleteRes.success).toBe(false);
    });
  });

  describe('Development Mode CRUD Logic', () => {
    it('lists dev mock posts and finds post by slug', async () => {
      const listRes = await getAdminBlogPosts();
      expect(listRes.isUnavailable).toBe(false);
      expect(listRes.data.length).toBeGreaterThanOrEqual(8);

      const bySlug = await getAdminBlogPostBySlug(listRes.data[0].slug);
      expect(bySlug.post?.id).toBe(listRes.data[0].id);
    });

    it('creates, updates and deletes a post in development mode', async () => {
      const created = await createAdminBlogPost({
        title: 'Artigo Especial de Teste',
        excerpt: 'Resumo de teste',
        content: '<p>Corpo de teste</p>',
        category: 'Devaneios',
        status: 'Publicado',
      });
      expect(created.success).toBe(true);
      expect(created.post?.slug).toBe('artigo-especial-de-teste');

      const updated = await updateAdminBlogPost({
        id: created.post!.id,
        title: 'Artigo Especial de Teste Modificado',
      });
      expect(updated.success).toBe(true);
      expect(updated.post?.title).toBe('Artigo Especial de Teste Modificado');

      const deleted = await deleteAdminBlogPost(created.post!.id);
      expect(deleted.success).toBe(true);

      const notFound = await getAdminBlogPostBySlug(created.post!.slug);
      expect(notFound.post).toBeNull();
    });

    it('creates, rejects duplicate, updates and deletes a category in dev mode', async () => {
      const created = await createAdminBlogCategory({ descricao: 'Podcasts' });
      expect(created.success).toBe(true);
      expect(created.category?.slug).toBe('podcasts');

      // duplicate
      const duplicate = await createAdminBlogCategory({
        descricao: 'Podcasts',
      });
      expect(duplicate.success).toBe(false);
      expect(duplicate.message).toContain('já existe');

      const updated = await updateAdminBlogCategory(
        created.category!.id,
        'Podcasts Oficiais',
      );
      expect(updated.success).toBe(true);
      expect(updated.category?.descricao).toBe('Podcasts Oficiais');

      const deleted = await deleteAdminBlogCategory(created.category!.id);
      expect(deleted.success).toBe(true);
    });
  });
});
