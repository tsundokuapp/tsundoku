import { apiPrivate } from '@/core/api';

import {
  createAdminGenre,
  deleteAdminGenre,
  getAdminGenres,
  updateAdminGenre,
} from './genreAdminApi';

jest.mock('@/core/api', () => ({
  apiPrivate: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));

describe('genreAdminApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAdminGenres', () => {
    it('returns empty array when response is 204 or empty string', async () => {
      (apiPrivate.get as jest.Mock).mockResolvedValueOnce({
        status: 204,
        data: '',
      });

      const res = await getAdminGenres();
      expect(res.ok).toBe(true);
      if (res.ok) {
        expect(res.data.data).toEqual([]);
      }
    });

    it('returns genre list when response has data array', async () => {
      const mockGenres = [
        { id: '1', descricao: 'Fantasia', usuarioInclusao: 'admin' },
        { id: '2', descricao: 'Aventura', usuarioInclusao: 'admin' },
      ];
      (apiPrivate.get as jest.Mock).mockResolvedValueOnce({
        status: 200,
        data: { data: mockGenres },
      });

      const res = await getAdminGenres();
      expect(res.ok).toBe(true);
      if (res.ok) {
        expect(res.data.data).toEqual(mockGenres);
      }
    });
  });

  describe('createAdminGenre', () => {
    it('calls post with FormData containing descricao', async () => {
      (apiPrivate.post as jest.Mock).mockResolvedValueOnce({
        data: { id: '3', descricao: 'Isekai' },
      });

      const res = await createAdminGenre('Isekai');
      expect(res.ok).toBe(true);
      expect(apiPrivate.post).toHaveBeenCalledWith(
        '/admin/genero',
        expect.any(FormData),
      );
    });
  });

  describe('updateAdminGenre', () => {
    it('calls put with FormData containing id and descricao', async () => {
      (apiPrivate.put as jest.Mock).mockResolvedValueOnce({
        data: { id: '3', descricao: 'Isekai Atualizado' },
      });

      const res = await updateAdminGenre('3', 'Isekai Atualizado');
      expect(res.ok).toBe(true);
      expect(apiPrivate.put).toHaveBeenCalledWith(
        '/admin/genero',
        expect.any(FormData),
      );
    });
  });

  describe('deleteAdminGenre', () => {
    it('calls delete with genre id in path', async () => {
      (apiPrivate.delete as jest.Mock).mockResolvedValueOnce({
        data: { message: 'Gênero deletado com sucesso' },
      });

      const res = await deleteAdminGenre('genre-123');
      expect(res.ok).toBe(true);
      expect(apiPrivate.delete).toHaveBeenCalledWith('/admin/genero/genre-123');
    });
  });
});
