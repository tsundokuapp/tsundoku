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

import { BlogCategoryGrid } from '@/features/admin/blog/components/BlogCategoryGrid';
import { BlogCategoryTable } from '@/features/admin/blog/components/BlogCategoryTable';
import {
  useAdminBlogCategories,
  useCreateAdminBlogCategory,
  useDeleteAdminBlogCategory,
  useUpdateAdminBlogCategory,
} from '@/features/admin/blog/hooks/useBlogAdmin';
import { IAdminBlogCategory } from '@/features/admin/blog/types/blogAdmin';
import { AdminBreadcrumbs } from '@/shared/components/layout/v22/AdminBreadcrumbs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { useToaster } from '@/shared/contexts/ToasterContext';

export default function BlogCategoriasPage() {
  const { toaster } = useToaster();
  const { data: categoriesResult, isLoading } = useAdminBlogCategories();
  const createMutation = useCreateAdminBlogCategory();
  const updateMutation = useUpdateAdminBlogCategory();
  const deleteMutation = useDeleteAdminBlogCategory();

  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [search, setSearch] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('Devaneios');

  // Modals state
  const [editingCategory, setEditingCategory] =
    useState<IAdminBlogCategory | null>(null);
  const [editCategoryName, setEditCategoryName] = useState('');
  const [deletingCategory, setDeletingCategory] =
    useState<IAdminBlogCategory | null>(null);

  const categories = useMemo(
    () => categoriesResult?.data || [],
    [categoriesResult?.data],
  );
  const isUnavailable = categoriesResult?.isUnavailable || false;

  const filteredCategories = useMemo(() => {
    if (!search.trim()) return categories;
    const q = search.toLowerCase();
    return categories.filter(
      (c) =>
        c.descricao.toLowerCase().includes(q) ||
        c.author.toLowerCase().includes(q),
    );
  }, [categories, search]);

  const handleInlineAdd = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newCategoryName.trim()) {
      toaster({
        type: 'error',
        msg: 'Informe o nome da categoria.',
      });
      return;
    }

    try {
      const res = await createMutation.mutateAsync({
        descricao: newCategoryName.trim(),
      });

      if (res.success) {
        toaster({
          type: 'success',
          msg: `Categoria "${newCategoryName.trim()}" criada com sucesso!`,
        });
        setNewCategoryName('');
      } else {
        toaster({
          type: 'warning',
          msg: res.message || 'Erro ao criar categoria.',
        });
      }
    } catch {
      toaster({
        type: 'error',
        msg: 'Erro ao criar categoria.',
      });
    }
  };

  const handleOpenEdit = (cat: IAdminBlogCategory) => {
    setEditingCategory(cat);
    setEditCategoryName(cat.descricao);
  };

  const handleConfirmEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory || !editCategoryName.trim()) return;

    try {
      const res = await updateMutation.mutateAsync({
        id: editingCategory.id,
        descricao: editCategoryName.trim(),
      });

      if (res.success) {
        toaster({
          type: 'success',
          msg: 'Categoria atualizada com sucesso!',
        });
        setEditingCategory(null);
      } else {
        toaster({
          type: 'warning',
          msg: res.message || 'Erro ao atualizar categoria.',
        });
      }
    } catch {
      toaster({
        type: 'error',
        msg: 'Erro ao atualizar categoria.',
      });
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingCategory) return;

    try {
      const res = await deleteMutation.mutateAsync(deletingCategory.id);
      if (res.success) {
        toaster({
          type: 'success',
          msg: `Categoria "${deletingCategory.descricao}" excluída com sucesso.`,
        });
        setDeletingCategory(null);
      } else {
        toaster({
          type: 'warning',
          msg: res.message || 'Erro ao excluir categoria.',
        });
      }
    } catch {
      toaster({
        type: 'error',
        msg: 'Erro ao excluir categoria.',
      });
    }
  };

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-6 md:px-6">
      {/* Header & Breadcrumbs */}
      <header className="mb-6 flex flex-col gap-2">
        <AdminBreadcrumbs />
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Categorias do Blog
        </h1>
        <p className="text-sm text-gray-400">
          Organize e gerencie as categorias e tópicos editoriais dos artigos
          publicados.
        </p>
      </header>

      {/* Production R3 Notice Banner if backend unavailable */}
      {isUnavailable && (
        <div
          className="mb-6 rounded-lg border border-amber-500/30 bg-amber-950/30 p-4 text-xs text-amber-300"
          data-testid="blog-categories-prod-notice"
        >
          ℹ️ {categoriesResult?.unavailableReason}
        </div>
      )}

      {/* Inline Add Category Bar (Figma 1268:29881) */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <form
          onSubmit={handleInlineAdd}
          className="relative flex w-full max-w-[500px] items-center"
        >
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="Adicionar nova categoria..."
            className="h-[38px] w-full rounded-lg border border-[#2e2e38] bg-[#202024] pl-3.5 pr-11 text-sm text-white placeholder-gray-400 transition-colors focus:border-[#259cc1] focus:outline-none"
          />
          <button
            type="submit"
            disabled={createMutation.isPending}
            title="Adicionar Categoria"
            className="absolute right-1 flex h-[30px] w-[30px] items-center justify-center rounded bg-[#259cc1] text-[#121214] transition-all hover:brightness-110 disabled:opacity-50"
          >
            <Plus size={16} weight="bold" />
          </button>
        </form>

        {/* View Toggle (Grid / Table) */}
        <div className="flex items-center self-start rounded-lg border border-[#2e2e38] bg-[#202024] p-1 sm:self-auto">
          <button
            type="button"
            onClick={() => setViewMode('grid')}
            title="Visualização em Grade de Chips"
            className={`rounded p-1.5 transition-colors ${
              viewMode === 'grid'
                ? 'bg-[#259cc1] text-[#121214]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <SquaresFour size={18} />
          </button>
          <button
            type="button"
            onClick={() => setViewMode('table')}
            title="Visualização em Tabela"
            className={`rounded p-1.5 transition-colors ${
              viewMode === 'table'
                ? 'bg-[#259cc1] text-[#121214]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <TableIcon size={18} />
          </button>
        </div>
      </div>

      {/* Search Bar (Figma 1268:29887) */}
      <div className="relative mb-6 w-full max-w-[500px]">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Pesquisar Categorias..."
          className="h-[40px] w-full rounded-lg border border-[#2e2e38] bg-[#202024] pl-10 pr-4 text-sm text-white placeholder-gray-400 transition-colors focus:border-[#259cc1] focus:outline-none"
        />
        <MagnifyingGlass
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
      </div>

      {/* Main Categories Display */}
      {isLoading ? (
        <div className="py-12 text-center text-sm text-gray-400">
          Carregando categorias do blog...
        </div>
      ) : filteredCategories.length === 0 ? (
        <div className="rounded-lg border border-dashed border-[#2e2e38] py-12 text-center text-sm text-gray-400">
          Nenhuma categoria encontrada.
        </div>
      ) : viewMode === 'grid' ? (
        <div className="rounded-lg border border-[#2e2e38] bg-[#202024]/40 p-6">
          <BlogCategoryGrid
            categories={filteredCategories}
            activeCategory={activeCategory}
            onSelectCategory={(cat) => setActiveCategory(cat.descricao)}
            onEdit={handleOpenEdit}
            onDelete={(cat) => setDeletingCategory(cat)}
          />
        </div>
      ) : (
        <BlogCategoryTable
          categories={filteredCategories}
          onEdit={handleOpenEdit}
          onDelete={(cat) => setDeletingCategory(cat)}
        />
      )}

      {/* Edit Category Modal */}
      <Dialog
        open={Boolean(editingCategory)}
        onOpenChange={(open) => !open && setEditingCategory(null)}
      >
        <DialogContent className="max-w-[450px] bg-[#18181b] p-6 text-white sm:rounded-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-bold text-white">
              <PencilSimple size={22} className="text-[#259cc1]" />
              Editar Categoria
            </DialogTitle>
            <DialogDescription className="sr-only">
              Formulário de edição de nome da categoria
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={handleConfirmEdit}
            className="mt-4 flex flex-col gap-4"
          >
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-200">
                Nome da Categoria
              </label>
              <input
                type="text"
                required
                value={editCategoryName}
                onChange={(e) => setEditCategoryName(e.target.value)}
                className="w-full rounded-md border border-[#2e2e38] bg-[#202024] px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-[#259cc1] focus:outline-none"
              />
            </div>

            <div className="mt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditingCategory(null)}
                className="rounded px-4 py-2 text-sm text-gray-400 hover:text-white"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={updateMutation.isPending}
                className="rounded bg-[#259cc1] px-4 py-2 text-sm font-semibold text-[#121214] hover:brightness-110 disabled:opacity-50"
              >
                {updateMutation.isPending ? 'Salvando...' : 'Salvar Alteração'}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Category Confirmation Modal */}
      <Dialog
        open={Boolean(deletingCategory)}
        onOpenChange={(open) => !open && setDeletingCategory(null)}
      >
        <DialogContent className="max-w-[450px] bg-[#18181b] p-6 text-white sm:rounded-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-bold text-red-500">
              <Trash size={22} />
              Excluir Categoria
            </DialogTitle>
            <DialogDescription className="sr-only">
              Confirmação de exclusão da categoria
            </DialogDescription>
          </DialogHeader>

          <p className="mt-2 text-sm text-gray-300">
            Tem certeza de que deseja excluir a categoria{' '}
            <strong className="text-white">
              &ldquo;{deletingCategory?.descricao}&rdquo;
            </strong>
            ? Posts vinculados permanecerão sem categoria definida.
          </p>

          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setDeletingCategory(null)}
              className="rounded px-4 py-2 text-sm text-gray-400 hover:text-white"
            >
              Cancelar
            </button>
            <button
              type="button"
              disabled={deleteMutation.isPending}
              onClick={handleConfirmDelete}
              className="rounded bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
            >
              {deleteMutation.isPending ? 'Excluindo...' : 'Confirmar Exclusão'}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
