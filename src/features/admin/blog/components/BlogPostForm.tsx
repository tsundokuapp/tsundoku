'use client';

import {
  ArrowLeft,
  Check,
  FloppyDisk,
  Image as ImageIcon,
  MagnifyingGlass,
  Trash,
} from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { useToaster } from '@/shared/contexts/ToasterContext';

import {
  useAdminBlogCategories,
  useCreateAdminBlogPost,
  useDeleteAdminBlogPost,
  useUpdateAdminBlogPost,
} from '../hooks/useBlogAdmin';
import { IAdminBlogPost } from '../types/blogAdmin';
import { generateSlug } from '../utils/blogDevMock';

interface BlogPostFormProps {
  initialData?: IAdminBlogPost;
  isEdit?: boolean;
  backHref?: string;
}

export const BlogPostForm = ({
  initialData,
  isEdit = false,
  backHref = '/admin/posts',
}: BlogPostFormProps) => {
  const router = useRouter();
  const { toaster } = useToaster();

  const createMutation = useCreateAdminBlogPost();
  const updateMutation = useUpdateAdminBlogPost();
  const deleteMutation = useDeleteAdminBlogPost();

  const { data: categoriesResult } = useAdminBlogCategories();
  const categories = useMemo(
    () => categoriesResult?.data || [],
    [categoriesResult?.data],
  );

  const [title, setTitle] = useState(initialData?.title || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(
    Boolean(initialData?.slug),
  );
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [coverImage, setCoverImage] = useState(initialData?.coverImage || '');
  const [selectedCategory, setSelectedCategory] = useState(
    initialData?.category || 'Notícias',
  );
  const [status, setStatus] = useState<'Publicado' | 'Rascunho'>(
    initialData?.status || 'Publicado',
  );
  const [categorySearch, setCategorySearch] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (!isSlugManuallyEdited && title) {
      setSlug(generateSlug(title));
    }
  }, [title, isSlugManuallyEdited]);

  const filteredCategories = useMemo(() => {
    if (!categorySearch.trim()) return categories;
    return categories.filter((c) =>
      c.descricao.toLowerCase().includes(categorySearch.toLowerCase()),
    );
  }, [categories, categorySearch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toaster({
        type: 'error',
        msg: 'O título do post é obrigatório.',
      });
      return;
    }

    if (!content.trim()) {
      toaster({
        type: 'error',
        msg: 'O conteúdo do post é obrigatório.',
      });
      return;
    }

    try {
      if (isEdit && initialData) {
        const res = await updateMutation.mutateAsync({
          id: initialData.id,
          title: title.trim(),
          slug: slug.trim() || generateSlug(title),
          excerpt: excerpt.trim(),
          content: content.trim(),
          coverImage,
          category: selectedCategory,
          status,
        });

        if (res.success) {
          toaster({
            type: 'success',
            msg: 'Post atualizado com sucesso!',
          });
          router.push(backHref);
        } else {
          toaster({
            type: 'warning',
            msg: res.message || 'Não foi possível atualizar o post.',
          });
        }
      } else {
        const res = await createMutation.mutateAsync({
          title: title.trim(),
          slug: slug.trim() || generateSlug(title),
          excerpt: excerpt.trim(),
          content: content.trim(),
          coverImage: coverImage || '/images/mock/blog/cover-default.jpg',
          category: selectedCategory,
          status,
        });

        if (res.success) {
          toaster({
            type: 'success',
            msg: 'Post criado com sucesso!',
          });
          router.push(backHref);
        } else {
          toaster({
            type: 'warning',
            msg: res.message || 'Não foi possível criar o post.',
          });
        }
      }
    } catch {
      toaster({
        type: 'error',
        msg: 'Erro ao processar post.',
      });
    }
  };

  const handleDelete = async () => {
    if (!initialData) return;

    try {
      const res = await deleteMutation.mutateAsync(initialData.id);
      if (res.success) {
        toaster({
          type: 'success',
          msg: 'Post excluído com sucesso.',
        });
        router.push(backHref);
      } else {
        toaster({
          type: 'warning',
          msg: res.message || 'Não foi possível excluir o post.',
        });
      }
    } catch {
      toaster({
        type: 'error',
        msg: 'Erro ao excluir post.',
      });
    }
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <form onSubmit={handleSubmit} className="w-full text-white">
      {/* Top Header with Back Button and Actions */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href={backHref}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#2e2e38] bg-[#202024] text-gray-300 transition-colors hover:border-[#259cc1] hover:text-white"
            title="Voltar"
          >
            <ArrowLeft size={18} />
          </Link>
          <h2 className="text-xl font-bold tracking-tight text-white">
            {isEdit ? 'Editar Post' : 'Adicionar Post'}
          </h2>
        </div>

        {/* Action Buttons (Figma 1320:35212 / 1321:35326 / 1321:35323) */}
        <div className="flex items-center gap-3">
          {isEdit && (
            <button
              type="button"
              onClick={() => setIsDeleteModalOpen(true)}
              className="flex h-[36px] items-center gap-2 rounded bg-red-600/30 px-4 text-sm font-medium text-red-400 transition-colors hover:bg-red-600 hover:text-white"
            >
              <Trash size={16} />
              Excluir
            </button>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex h-[36px] items-center gap-2 rounded bg-[#259cc1] px-5 text-sm font-semibold text-[#121214] transition-all hover:brightness-110 disabled:opacity-50"
          >
            <FloppyDisk size={18} />
            {isSubmitting ? 'Salvando...' : isEdit ? 'Atualizar' : 'Adicionar'}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Main Column (Title, Slug, Excerpt, Content) */}
        <div className="flex-1 space-y-4">
          {/* Title Input (800x40px, border #259cc1) */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-200">
              Título do Post *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Adicionar título post"
              className="h-[44px] w-full max-w-[800px] rounded-lg border border-[#259cc1] bg-[#202024] px-3.5 text-base text-white placeholder-gray-500 transition-colors focus:outline-none focus:ring-1 focus:ring-[#259cc1]"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-200">
              Slug da URL
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => {
                setSlug(e.target.value);
                setIsSlugManuallyEdited(true);
              }}
              placeholder="slug-do-post"
              className="h-[38px] w-full max-w-[800px] rounded-lg border border-[#2e2e38] bg-[#202024] px-3.5 font-mono text-sm text-gray-300 placeholder-gray-500 transition-colors focus:border-[#259cc1] focus:outline-none"
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-200">
              Resumo / Sinopse
            </label>
            <textarea
              rows={2}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Breve resumo exibido nos cards e resultados de busca..."
              className="w-full max-w-[800px] rounded-lg border border-[#2e2e38] bg-[#202024] p-3 text-sm text-white placeholder-gray-500 transition-colors focus:border-[#259cc1] focus:outline-none"
            />
          </div>

          {/* Content Body Editor (800x422px in Figma) */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-200">
              Conteúdo do Artigo (HTML / Markdown) *
            </label>
            <textarea
              rows={16}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Escreva ou cole aqui o conteúdo formatado do post..."
              className="min-h-[380px] w-full max-w-[800px] rounded-lg border border-[#2e2e38] bg-[#202024] p-4 font-mono text-sm leading-relaxed text-gray-100 placeholder-gray-500 transition-colors focus:border-[#259cc1] focus:outline-none"
            />
          </div>
        </div>

        {/* Sidebar Column (Cover Banner, Status, Category Checklist) */}
        <div className="w-full space-y-6 lg:w-[280px]">
          {/* Status Selector */}
          <div className="rounded-lg border border-[#2e2e38] bg-[#202024] p-4">
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-400">
              Status da Publicação
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setStatus('Publicado')}
                className={`flex-1 rounded py-1.5 text-xs font-semibold transition-all ${
                  status === 'Publicado'
                    ? 'bg-[#259cc1] text-[#121214]'
                    : 'bg-[#18181b] text-gray-400 hover:text-white'
                }`}
              >
                Publicado
              </button>
              <button
                type="button"
                onClick={() => setStatus('Rascunho')}
                className={`flex-1 rounded py-1.5 text-xs font-semibold transition-all ${
                  status === 'Rascunho'
                    ? 'bg-amber-600 text-white'
                    : 'bg-[#18181b] text-gray-400 hover:text-white'
                }`}
              >
                Rascunho
              </button>
            </div>
          </div>

          {/* Cover Banner (Figma 1268:30296 / 1268:30293) */}
          <div className="rounded-lg border border-[#2e2e38] bg-[#202024] p-4">
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-400">
              Capa Principal / Banner
            </label>
            <div className="relative mb-3 flex h-[160px] w-full items-center justify-center overflow-hidden rounded-md border border-[#2e2e38] bg-[#18181b]">
              {coverImage ? (
                <Image
                  src={coverImage}
                  alt="Banner preview"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex flex-col items-center gap-1 text-gray-500">
                  <ImageIcon size={32} />
                  <span className="text-xs">Nenhuma capa definida</span>
                </div>
              )}
            </div>

            <input
              type="text"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="URL da imagem de destaque..."
              className="mb-2 w-full rounded border border-[#2e2e38] bg-[#18181b] px-2.5 py-1.5 text-xs text-white placeholder-gray-500 focus:border-[#259cc1] focus:outline-none"
            />

            <button
              type="button"
              onClick={() => {
                const sample = `/images/mock/blog/cover${Math.floor(Math.random() * 8) + 1}.jpg`;
                setCoverImage(sample);
              }}
              className="w-full rounded bg-[#259cc1] py-2 text-center text-xs font-semibold text-[#121214] transition-all hover:brightness-110"
            >
              Definir banner de destaque
            </button>
          </div>

          {/* Category Selector Checklist (Figma 1268:30279) */}
          <div className="rounded-lg border border-[#2e2e38] bg-[#202024] p-4">
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-400">
              Categorias
            </label>

            {/* Filter Input */}
            <div className="relative mb-3">
              <input
                type="text"
                value={categorySearch}
                onChange={(e) => setCategorySearch(e.target.value)}
                placeholder="Filtrar categorias..."
                className="w-full rounded border border-[#2e2e38] bg-[#18181b] py-1.5 pl-8 pr-2.5 text-xs text-white placeholder-gray-500 focus:border-[#259cc1] focus:outline-none"
              />
              <MagnifyingGlass
                size={14}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>

            {/* Checklist */}
            <div className="max-h-[220px] space-y-1 overflow-y-auto pr-1">
              {filteredCategories.length === 0 ? (
                <span className="text-xs text-gray-500">
                  Nenhuma categoria encontrada.
                </span>
              ) : (
                filteredCategories.map((cat) => {
                  const isSelected = selectedCategory === cat.descricao;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.descricao)}
                      className={`flex w-full items-center justify-between rounded px-2.5 py-1.5 text-left text-xs transition-colors ${
                        isSelected
                          ? 'bg-[#259cc1]/20 font-semibold text-[#259cc1]'
                          : 'text-gray-300 hover:bg-[#18181b]'
                      }`}
                    >
                      <span>{cat.descricao}</span>
                      {isSelected && <Check size={14} weight="bold" />}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={isDeleteModalOpen}
        onOpenChange={(open) => !open && setIsDeleteModalOpen(false)}
      >
        <DialogContent className="max-w-[450px] bg-[#18181b] p-6 text-white sm:rounded-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-bold text-red-500">
              <Trash size={22} />
              Excluir Post
            </DialogTitle>
            <DialogDescription className="sr-only">
              Confirmação de exclusão do post
            </DialogDescription>
          </DialogHeader>

          <p className="mt-2 text-sm text-gray-300">
            Tem certeza de que deseja excluir o post{' '}
            <strong className="text-white">&ldquo;{title}&rdquo;</strong>? Esta
            ação não poderá ser desfeita.
          </p>

          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsDeleteModalOpen(false)}
              className="rounded px-4 py-2 text-sm text-gray-400 hover:text-white"
            >
              Cancelar
            </button>
            <button
              type="button"
              disabled={deleteMutation.isPending}
              onClick={handleDelete}
              className="rounded bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
            >
              {deleteMutation.isPending ? 'Excluindo...' : 'Confirmar Exclusão'}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </form>
  );
};
