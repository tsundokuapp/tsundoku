'use client';

import {
  MagnifyingGlass,
  PencilSimple,
  Plus,
  SquaresFour,
  Table as TableIcon,
  Trash,
} from '@phosphor-icons/react/dist/ssr';
import { useMemo, useState } from 'react';

import { useAuthStore } from '@/core/auth/stores/useAuthStore';
import {
  useAdminGenres,
  useCreateAdminGenre,
  useDeleteAdminGenre,
  useUpdateAdminGenre,
} from '@/features/admin/genres/hooks/useAdminGenres';
import { IRetornoGenero } from '@/features/admin/genres/types/genreAdmin';
import { AdminBreadcrumbs } from '@/shared/components/layout/v22/AdminBreadcrumbs';
import { useToaster } from '@/shared/contexts/ToasterContext';
import { cn } from '@/shared/utils/cn';

export default function GenerosPage() {
  const { isAdmin } = useAuthStore();
  const { toaster } = useToaster();

  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [inlineNewGenre, setInlineNewGenre] = useState('');
  const [editingGenre, setEditingGenre] = useState<IRetornoGenero | null>(null);
  const [deleteModalGenre, setDeleteModalGenre] =
    useState<IRetornoGenero | null>(null);

  const { data: genresResponse, isLoading } = useAdminGenres();
  const createGenreMutation = useCreateAdminGenre();
  const updateGenreMutation = useUpdateAdminGenre();
  const deleteGenreMutation = useDeleteAdminGenre();

  const genresList: IRetornoGenero[] = useMemo(() => {
    if (genresResponse?.ok && Array.isArray(genresResponse.data?.data)) {
      return genresResponse.data.data;
    }
    return [];
  }, [genresResponse]);

  const filteredGenres = useMemo(() => {
    if (!searchQuery.trim()) return genresList;
    const q = searchQuery.toLowerCase();
    return genresList.filter((g) => g.descricao.toLowerCase().includes(q));
  }, [genresList, searchQuery]);

  const handleCreateGenre = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = inlineNewGenre.trim();
    if (!trimmed) return;

    try {
      const res = await createGenreMutation.mutateAsync(trimmed);
      if (res.ok) {
        toaster({
          type: 'success',
          msg: `Gênero "${trimmed}" criado com sucesso!`,
        });
        setInlineNewGenre('');
      } else {
        toaster({ type: 'error', msg: 'Erro ao criar gênero.' });
      }
    } catch {
      toaster({ type: 'error', msg: 'Erro ao criar gênero.' });
    }
  };

  const handleUpdateGenre = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGenre || !editingGenre.descricao.trim()) return;

    try {
      const res = await updateGenreMutation.mutateAsync({
        id: editingGenre.id,
        descricao: editingGenre.descricao.trim(),
      });
      if (res.ok) {
        toaster({ type: 'success', msg: 'Gênero atualizado com sucesso!' });
        setEditingGenre(null);
      } else {
        toaster({ type: 'error', msg: 'Erro ao atualizar gênero.' });
      }
    } catch {
      toaster({ type: 'error', msg: 'Erro ao atualizar gênero.' });
    }
  };

  const handleDeleteGenre = async () => {
    if (!deleteModalGenre) return;

    try {
      const res = await deleteGenreMutation.mutateAsync(deleteModalGenre.id);
      if (res.ok) {
        toaster({ type: 'success', msg: 'Gênero excluído com sucesso.' });
        setDeleteModalGenre(null);
      } else {
        toaster({ type: 'error', msg: 'Erro ao excluir gênero.' });
      }
    } catch {
      toaster({ type: 'error', msg: 'Erro ao excluir gênero.' });
    }
  };

  return (
    <div className="flex w-full flex-col gap-6">
      {/* Header matching Figma 1268:29668 & 1302:35182 */}
      <div className="flex flex-col gap-2">
        <AdminBreadcrumbs />
        <h1 className="text-xl font-bold text-[#e1e1e6]">Gêneros</h1>
      </div>

      {/* Control Bar: Search + Inline Add + View Toggle */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-wrap items-center gap-3">
          {/* Search bar matching Figma 1268:29668 */}
          <div className="relative w-full sm:w-[320px]">
            <MagnifyingGlass
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6c757d]"
              size={18}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquisar Gêneros"
              className="h-10 w-full rounded-[8px] border border-transparent bg-[#202024] pl-10 pr-4 text-sm text-[#e1e1e6] placeholder-[#6c757d] transition-colors focus:border-[#259cc1] focus:outline-none"
            />
          </div>

          {/* Inline Add Input matching Figma 1302:35182 */}
          {isAdmin && (
            <form
              onSubmit={handleCreateGenre}
              className="flex w-full items-center gap-2 sm:w-[320px]"
            >
              <input
                type="text"
                value={inlineNewGenre}
                onChange={(e) => setInlineNewGenre(e.target.value)}
                placeholder="Adicionar gênero"
                className="h-10 w-full rounded-[8px] border border-transparent bg-[#202024] px-3.5 text-sm text-[#e1e1e6] placeholder-[#6c757d] transition-colors focus:border-[#259cc1] focus:outline-none"
              />
              <button
                type="submit"
                disabled={
                  !inlineNewGenre.trim() || createGenreMutation.isPending
                }
                aria-label="Adicionar gênero"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] bg-[#259cc1] text-[#121214] shadow transition-colors hover:bg-[#2082a2] disabled:opacity-50"
              >
                <Plus size={18} weight="bold" />
              </button>
            </form>
          )}
        </div>

        {/* View Toggle (Grid vs Table) */}
        <div className="hidden items-center gap-1 rounded-lg border border-appCardBorder bg-appCardBackground p-1 sm:flex">
          <button
            type="button"
            aria-label="Grade de chips"
            aria-pressed={viewMode === 'grid'}
            onClick={() => setViewMode('grid')}
            className={cn(
              'flex h-7 w-7 items-center justify-center rounded-md text-appSidebarMuted transition-colors',
              viewMode === 'grid'
                ? 'bg-[#259cc1] text-white shadow-sm'
                : 'hover:bg-appGroupBackground hover:text-appText',
            )}
          >
            <SquaresFour
              size={16}
              weight={viewMode === 'grid' ? 'fill' : 'regular'}
            />
          </button>
          <button
            type="button"
            aria-label="Tabela de gêneros"
            aria-pressed={viewMode === 'table'}
            onClick={() => setViewMode('table')}
            className={cn(
              'flex h-7 w-7 items-center justify-center rounded-md text-appSidebarMuted transition-colors',
              viewMode === 'table'
                ? 'bg-[#259cc1] text-white shadow-sm'
                : 'hover:bg-appGroupBackground hover:text-appText',
            )}
          >
            <TableIcon
              size={16}
              weight={viewMode === 'table' ? 'fill' : 'regular'}
            />
          </button>
        </div>
      </div>

      {/* Main Content */}
      {isLoading ? (
        <div className="flex h-48 items-center justify-center text-sm text-[#a8a8b3]">
          Carregando gêneros...
        </div>
      ) : filteredGenres.length === 0 ? (
        <div className="flex h-48 flex-col items-center justify-center gap-2 rounded-[8px] border border-dashed border-[#202024] p-6 text-center text-[#a8a8b3]">
          <p>Nenhum gênero encontrado.</p>
        </div>
      ) : (
        <>
          {/* Mobile 3-column chip view matching Figma 1322:36019 */}
          <div className="block sm:hidden">
            <div className="grid grid-cols-3 gap-2.5">
              {filteredGenres.map((genre) => (
                <div
                  key={genre.id}
                  className="flex h-[35px] items-center justify-center truncate rounded-[4px] border border-[#259cc1] bg-[#121214] px-2 text-center text-xs font-medium text-[#259cc1]"
                  title={genre.descricao}
                >
                  <span className="truncate">{genre.descricao}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Views (Grid or Table) */}
          <div className="hidden sm:block">
            {viewMode === 'grid' ? (
              /* Chips Grid matching Figma 1268:29668 */
              <div className="flex flex-wrap gap-2.5 rounded-[8px] bg-[#202024] p-6">
                {filteredGenres.map((genre) => (
                  <div
                    key={genre.id}
                    className="group relative flex h-[32px] items-center gap-1.5 rounded-[4px] border border-[#259cc1] bg-[#121214] px-3 text-sm font-medium text-[#259cc1] transition-all hover:bg-[#259cc1] hover:text-white"
                  >
                    <span>{genre.descricao}</span>

                    {isAdmin && (
                      <div className="ml-1 hidden items-center gap-1 group-hover:flex">
                        <button
                          type="button"
                          onClick={() => setEditingGenre(genre)}
                          aria-label={`Editar ${genre.descricao}`}
                          className="hover:text-black"
                        >
                          <PencilSimple size={13} weight="bold" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteModalGenre(genre)}
                          aria-label={`Excluir ${genre.descricao}`}
                          className="hover:text-red-700"
                        >
                          <Trash size={13} weight="bold" />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              /* Table View matching Figma 1302:35182 */
              <div className="w-full space-y-2">
                <div className="grid h-[35px] grid-cols-12 items-center rounded-[8px] bg-[#202024] px-4 text-xs font-semibold text-[#a8a8b3]">
                  <span className="col-span-5">Título</span>
                  <span className="col-span-3">Autor Cadastro</span>
                  <span className="col-span-3 text-center">Data Cadastro</span>
                  <span className="col-span-1 text-right">Ações</span>
                </div>

                {filteredGenres.map((genre) => (
                  <div
                    key={genre.id}
                    className="grid h-[60px] grid-cols-12 items-center rounded-[8px] bg-[#202024] px-4 text-sm text-[#e1e1e6] transition-colors hover:bg-[#28282c]"
                  >
                    <span className="col-span-5 font-medium">
                      {genre.descricao}
                    </span>
                    <span className="col-span-3 text-xs text-[#a8a8b3]">
                      {genre.usuarioInclusao || 'admin'}
                    </span>
                    <span className="col-span-3 text-center text-xs text-[#a8a8b3]">
                      {genre.dataInclusao || '—'}
                    </span>
                    <div className="col-span-1 flex items-center justify-end gap-2">
                      {isAdmin && (
                        <>
                          <button
                            type="button"
                            onClick={() => setEditingGenre(genre)}
                            aria-label={`Editar ${genre.descricao}`}
                            className="flex h-7 w-7 items-center justify-center rounded text-[#a8a8b3] transition-colors hover:bg-white/10 hover:text-white"
                          >
                            <PencilSimple size={15} />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteModalGenre(genre)}
                            aria-label={`Excluir ${genre.descricao}`}
                            className="flex h-7 w-7 items-center justify-center rounded text-red-400 transition-colors hover:bg-red-500/20 hover:text-red-300"
                          >
                            <Trash size={15} />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* Edit Genre Modal */}
      {editingGenre && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <form
            onSubmit={handleUpdateGenre}
            className="w-full max-w-md rounded-lg border border-appCardBorder bg-[#202024] p-6 shadow-xl"
          >
            <h3 className="text-lg font-bold text-white">Editar Gênero</h3>
            <div className="mt-4">
              <label className="mb-1.5 block text-xs font-medium text-[#a8a8b3]">
                Descrição do Gênero
              </label>
              <input
                type="text"
                value={editingGenre.descricao}
                onChange={(e) =>
                  setEditingGenre({
                    ...editingGenre,
                    descricao: e.target.value,
                  })
                }
                required
                className="h-10 w-full rounded-[8px] border border-white/10 bg-[#121214] px-3.5 text-sm text-[#e1e1e6] focus:border-[#259cc1] focus:outline-none"
              />
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingGenre(null)}
                className="rounded-[4px] bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={updateGenreMutation.isPending}
                className="rounded-[4px] bg-[#259cc1] px-4 py-2 text-sm font-semibold text-[#121214] transition-colors hover:bg-[#2082a2] disabled:opacity-50"
              >
                {updateGenreMutation.isPending
                  ? 'Salvando...'
                  : 'Salvar Alteração'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Delete Genre Modal */}
      {deleteModalGenre && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-md rounded-lg border border-appCardBorder bg-[#202024] p-6 shadow-xl">
            <h3 className="text-lg font-bold text-white">Excluir Gênero</h3>
            <p className="mt-2 text-sm text-[#a8a8b3]">
              Tem certeza que deseja excluir o gênero &quot;
              {deleteModalGenre.descricao}&quot;?
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteModalGenre(null)}
                className="rounded-[4px] bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleDeleteGenre}
                disabled={deleteGenreMutation.isPending}
                className="rounded-[4px] bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-50"
              >
                {deleteGenreMutation.isPending
                  ? 'Excluindo...'
                  : 'Confirmar Exclusão'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
