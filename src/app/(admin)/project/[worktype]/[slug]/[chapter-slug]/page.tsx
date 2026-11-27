'use client';

import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  CloudArrowUp,
  Trash,
} from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useId, useState } from 'react';

import { useAuthStore } from '@/core/auth/stores/useAuthStore';
import {
  createComicChapter,
  deleteComicChapter,
  updateComicChapter,
} from '@/features/admin/comics/api/comicAdmin';
import {
  createNovelChapter,
  deleteNovelChapter,
  updateChapterNovel,
} from '@/features/admin/novels/api/novelAdminApi';
import {
  useAdminChapterNovel,
  useAdminNovelBySlug,
} from '@/features/admin/novels/hooks/usePrivateNovels';
import { Editor } from '@/features/editor/components/Editor';
import { useEditorStore } from '@/features/editor/store/useEditorStore';
import { useVolumesNovel } from '@/features/novels/hooks/usePublicNovels';
import { AdminBreadcrumbs } from '@/shared/components/layout/v22/AdminBreadcrumbs';
import { useToaster } from '@/shared/contexts/ToasterContext';

interface ChapterPageParams {
  worktype: string;
  slug: string;
  'chapter-slug': string;
}

interface MangaPageItem {
  id: string;
  url: string;
  file?: File;
  name: string;
}

export default function UnifiedChapterAdminPage({
  params,
  searchParams,
}: {
  params: ChapterPageParams;
  searchParams?: { volumeId?: string };
}) {
  const router = useRouter();
  const { isAdmin } = useAuthStore();
  const { toaster } = useToaster();
  const { editor } = useEditorStore();
  const fileInputId = useId();

  const worktype = params.worktype === 'comic' ? 'comic' : 'novel';
  const obraSlug = params.slug;
  const chapterSlug = params['chapter-slug'];
  const isNew = chapterSlug === 'novo' || chapterSlug === 'adicionar';
  const isNovel = worktype === 'novel';

  // Work data
  const { data: novelResponse } = useAdminNovelBySlug(isNovel ? obraSlug : '');
  const novelData = novelResponse?.ok ? novelResponse.data : undefined;
  const obraId = novelData?.id || '';

  // Volumes data
  const { data: volumesResponse } = useVolumesNovel(obraId);
  const volumes = Array.isArray(volumesResponse?.data)
    ? volumesResponse.data
    : [];

  // Edit mode: fetch existing novel chapter data
  const { data: chapterDetailResponse, isLoading: isLoadingChapter } =
    useAdminChapterNovel(!isNew && isNovel ? chapterSlug : '');
  const chapterData = chapterDetailResponse?.ok
    ? chapterDetailResponse.data
    : undefined;

  // Form states
  const [selectedVolumeId, setSelectedVolumeId] = useState<string>(
    searchParams?.volumeId || '',
  );
  const [title, setTitle] = useState('');
  const [number, setNumber] = useState('');
  const [part, setPart] = useState('');
  const [order, setOrder] = useState('1');
  const [translator, setTranslator] = useState('');
  const [reviewer, setReviewer] = useState('');
  const [slug, setSlug] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Manga page manager state
  const [mangaPages, setMangaPages] = useState<MangaPageItem[]>([]);

  // Initialize edit fields
  useEffect(() => {
    if (chapterData) {
      setTitle(chapterData.titulo || '');
      setNumber(chapterData.numero || '');
      setPart(chapterData.parte || '');
      setOrder(String(chapterData.ordemCapitulo ?? 1));
      setTranslator(chapterData.tradutor || '');
      setReviewer(chapterData.revisor || '');
      setSlug(chapterData.slug || '');
    }
  }, [chapterData]);

  // Handle image upload in Manga dropzone
  const handleMangaImageUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const newItems: MangaPageItem[] = Array.from(files).map((file, idx) => ({
      id: `${Date.now()}-${idx}`,
      url: URL.createObjectURL(file),
      file,
      name: file.name,
    }));
    setMangaPages((prev) => [...prev, ...newItems]);
  };

  // Reorder page up
  const handleMovePageUp = (index: number) => {
    if (index === 0) return;
    setMangaPages((prev) => {
      const copy = [...prev];
      const temp = copy[index - 1];
      copy[index - 1] = copy[index];
      copy[index] = temp;
      return copy;
    });
  };

  // Reorder page down
  const handleMovePageDown = (index: number) => {
    if (index === mangaPages.length - 1) return;
    setMangaPages((prev) => {
      const copy = [...prev];
      const temp = copy[index + 1];
      copy[index + 1] = copy[index];
      copy[index] = temp;
      return copy;
    });
  };

  // Remove page
  const handleRemovePage = (index: number) => {
    setMangaPages((prev) => prev.filter((_, idx) => idx !== index));
  };

  // Form Submit (Create or Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVolumeId && volumes.length > 0) {
      toaster({
        type: 'error',
        msg: 'Selecione um volume para o capítulo.',
      });
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('volumeId', selectedVolumeId || volumes[0]?.id || '');
    formData.append('numero', number);
    if (part) formData.append('parte', part);
    formData.append('ordemCapitulo', order);
    formData.append('titulo', title);
    if (translator) formData.append('tradutor', translator);
    if (reviewer) formData.append('revisor', reviewer);

    const currentUsername = useAuthStore.getState().username || 'admin';
    formData.append('usuarioAlteracao', currentUsername);
    if (isNew) {
      formData.append('usuarioInclusao', currentUsername);
    }

    try {
      if (isNovel) {
        const content = editor?.getHTML() || '';
        formData.append('conteudoNovel', content);
        formData.append('ehIlustracoesNovel', 'false');

        if (isNew) {
          const res = await createNovelChapter(formData);
          if (!res.ok) throw new Error('Falha ao criar capítulo');
          toaster({ type: 'success', msg: 'Capítulo criado com sucesso!' });
        } else {
          const chapterId = chapterData?.id || chapterSlug;
          formData.append('id', chapterId);
          const res = await updateChapterNovel(chapterId, formData);
          if (!res.ok) throw new Error('Falha ao atualizar capítulo');
          toaster({ type: 'success', msg: 'Capítulo atualizado com sucesso!' });
        }
      } else {
        // Manga: append image files
        mangaPages.forEach((item) => {
          if (item.file) {
            formData.append('listaImagensForm', item.file);
          }
        });

        if (isNew) {
          const res = await createComicChapter(formData);
          if (!res.ok) throw new Error('Falha ao criar capítulo de mangá');
          toaster({
            type: 'success',
            msg: 'Capítulo de mangá criado com sucesso!',
          });
        } else {
          const chapterId = chapterSlug;
          const res = await updateComicChapter(chapterId, formData);
          if (!res.ok) throw new Error('Falha ao atualizar capítulo de mangá');
          toaster({
            type: 'success',
            msg: 'Capítulo de mangá atualizado com sucesso!',
          });
        }
      }
      router.push(`/project/${worktype}/${obraSlug}`);
    } catch {
      toaster({
        type: 'error',
        msg: 'Erro ao salvar capítulo. Verifique os campos.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete chapter
  const handleDelete = async () => {
    setIsSubmitting(true);
    try {
      const chapterId = chapterData?.id || chapterSlug;
      const res = isNovel
        ? await deleteNovelChapter(chapterId, true)
        : await deleteComicChapter(chapterId, true);
      if (!res.ok) throw new Error();
      toaster({ type: 'success', msg: 'Capítulo excluído com sucesso.' });
      router.push(`/project/${worktype}/${obraSlug}`);
    } catch {
      toaster({ type: 'error', msg: 'Erro ao excluir o capítulo.' });
    } finally {
      setIsSubmitting(false);
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="flex w-full flex-col gap-6">
      {/* Header matching Figma 1258:114028 / 1258:113886 */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Voltar"
            className="flex h-8 w-8 items-center justify-center rounded-[4px] border border-white/10 bg-[#202024] text-[#a8a8b3] transition-colors hover:text-white"
          >
            <ArrowLeft size={16} weight="bold" />
          </button>
          <AdminBreadcrumbs />
        </div>
        <h1 className="text-xl font-bold text-[#e1e1e6]">
          {isNew
            ? `Adicionar Capítulo (${isNovel ? 'Novel' : 'Mangá'})`
            : `Editar Capítulo (${isNovel ? 'Novel' : 'Mangá'})`}
        </h1>
      </div>

      {isLoadingChapter && !isNew ? (
        <div className="flex h-64 items-center justify-center text-sm text-[#a8a8b3]">
          Carregando dados do capítulo...
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Metadata Grid */}
          <div className="flex flex-col gap-4 rounded-[8px] bg-[#202024] p-5">
            <h2 className="text-sm font-semibold text-[#a8a8b3]">
              Metadados do Capítulo
            </h2>

            {/* Obra & Volume Selectors */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#a8a8b3]">
                  Obra
                </label>
                <input
                  type="text"
                  disabled
                  value={novelData?.titulo || obraSlug}
                  className="h-10 w-full rounded-[8px] border border-white/5 bg-[#18181b] px-3.5 text-sm text-[#e1e1e6]"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#a8a8b3]">
                  Volume
                </label>
                <select
                  value={selectedVolumeId}
                  onChange={(e) => setSelectedVolumeId(e.target.value)}
                  className="h-10 w-full rounded-[8px] border border-white/10 bg-[#121214] px-3.5 text-sm text-[#e1e1e6] focus:border-[#259cc1] focus:outline-none"
                >
                  <option value="">Selecione o Volume</option>
                  {volumes.map((v) => (
                    <option key={v.id} value={v.id}>
                      Volume {v.numeroVolume}{' '}
                      {v.tituloVolume ? `— ${v.tituloVolume}` : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Title field matching Figma 1258:114022 */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#a8a8b3]">
                Título do Capítulo
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Adicionar título"
                className="h-10 w-full rounded-[8px] border border-white/10 bg-[#121214] px-3.5 text-sm text-[#e1e1e6] placeholder-[#6c757d] focus:border-[#259cc1] focus:outline-none"
              />
            </div>

            {/* Number, Part, Order */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#a8a8b3]">
                  Número do Capítulo
                </label>
                <input
                  type="text"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  placeholder="01"
                  required
                  className="h-10 w-full rounded-[8px] border border-[#259cc1] bg-[#121214] px-3.5 text-sm text-[#e1e1e6] focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#a8a8b3]">
                  Parte
                </label>
                <input
                  type="text"
                  value={part}
                  onChange={(e) => setPart(e.target.value)}
                  placeholder="01 (opcional)"
                  className="h-10 w-full rounded-[8px] border border-white/10 bg-[#121214] px-3.5 text-sm text-[#e1e1e6] focus:border-[#259cc1] focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#a8a8b3]">
                  Ordem do Capítulo
                </label>
                <input
                  type="number"
                  value={order}
                  onChange={(e) => setOrder(e.target.value)}
                  min="1"
                  className="h-10 w-full rounded-[8px] border border-white/10 bg-[#121214] px-3.5 text-sm text-[#e1e1e6] focus:border-[#259cc1] focus:outline-none"
                />
              </div>
            </div>

            {/* Staff assignment */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#a8a8b3]">
                  Tradutor(es)
                </label>
                <input
                  type="text"
                  value={translator}
                  onChange={(e) => setTranslator(e.target.value)}
                  placeholder="Nome do tradutor"
                  className="h-10 w-full rounded-[8px] border border-white/10 bg-[#121214] px-3.5 text-sm text-[#e1e1e6] focus:border-[#259cc1] focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#a8a8b3]">
                  Revisor(es)
                </label>
                <input
                  type="text"
                  value={reviewer}
                  onChange={(e) => setReviewer(e.target.value)}
                  placeholder="Nome do revisor"
                  className="h-10 w-full rounded-[8px] border border-white/10 bg-[#121214] px-3.5 text-sm text-[#e1e1e6] focus:border-[#259cc1] focus:outline-none"
                />
              </div>
            </div>

            {/* Slug in Edit Mode */}
            {!isNew && (
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#a8a8b3]">
                  Slug do Capítulo
                </label>
                <input
                  type="text"
                  value={slug}
                  disabled
                  className="h-10 w-full rounded-[8px] border border-white/5 bg-[#18181b] px-3.5 text-sm text-[#a8a8b3]"
                />
              </div>
            )}
          </div>

          {/* Novel Content: TipTap Editor matching Figma 1258:113997 */}
          {isNovel ? (
            <div className="flex flex-col gap-3 rounded-[8px] bg-[#202024] p-5">
              <h2 className="text-sm font-semibold text-[#a8a8b3]">
                Conteúdo da Novel
              </h2>
              <div className="min-h-[450px] rounded-[8px] border border-white/10 bg-[#121214] p-4 text-[#e1e1e6]">
                <Editor contentEditor={chapterData?.conteudoNovel} />
              </div>
            </div>
          ) : (
            /* Manga Content: Dropzone & Page Manager matching Figma 1258:113746 & 1238:1155 */
            <div className="flex flex-col gap-4 rounded-[8px] bg-[#202024] p-5">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-sm font-semibold text-[#e1e1e6]">
                    Gerenciador de Páginas do Mangá
                  </h2>
                  <p className="text-xs text-[#a8a8b3]">
                    Envie as páginas do capítulo e ajuste a ordem de
                    visualização.
                  </p>
                </div>

                <label
                  htmlFor={fileInputId}
                  className="flex cursor-pointer items-center justify-center gap-1.5 rounded-[8px] bg-[#259cc1] px-4 py-2 text-xs font-semibold text-[#121214] transition-colors hover:bg-[#2082a2]"
                >
                  <CloudArrowUp size={16} weight="bold" />
                  <span>Selecione as imagens...</span>
                </label>
                <input
                  id={fileInputId}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleMangaImageUpload(e.target.files)}
                  className="hidden"
                />
              </div>

              {/* R3 Gap comment:
                  // TODO(backend-integration): Reordenação de páginas de mangá via drag-and-drop requer endpoint no backend (ex: PUT /api/admin/capitulo/comic/{id}/paginas/reordenar). Atualmente o Tsundoku API só suporta upload inicial em lote via CapituloDTO.ListaImagensForm.
              */}
              {mangaPages.length === 0 ? (
                <div className="flex h-48 flex-col items-center justify-center gap-2 rounded-[8px] border border-dashed border-white/10 p-6 text-center text-sm text-[#a8a8b3]">
                  <CloudArrowUp size={32} className="text-[#6c757d]" />
                  <p>Nenhuma página carregada ainda.</p>
                  <p className="text-xs text-[#6c757d]">
                    Clique acima para selecionar imagens.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                  {mangaPages.map((page, idx) => (
                    <div
                      key={page.id}
                      className="group relative flex aspect-[250/375] w-full flex-col overflow-hidden rounded-[8px] border border-white/10 bg-[#121214] shadow"
                    >
                      <Image
                        src={page.url}
                        alt={`Página ${idx + 1}`}
                        fill
                        unoptimized
                        className="object-cover"
                      />

                      {/* Hover Overlay matching Figma 1238:1155 */}
                      <div className="absolute inset-0 flex flex-col items-center justify-between bg-black/75 p-3 opacity-0 transition-opacity group-hover:opacity-100">
                        <span className="text-sm font-bold text-[#259cc1]">
                          Imagem {String(idx + 1).padStart(2, '0')}
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => handleMovePageUp(idx)}
                            aria-label="Mover para cima"
                            className="flex h-8 w-8 items-center justify-center rounded bg-white/20 text-white hover:bg-white/30 disabled:opacity-30"
                          >
                            <ArrowUp size={16} weight="bold" />
                          </button>
                          <button
                            type="button"
                            disabled={idx === mangaPages.length - 1}
                            onClick={() => handleMovePageDown(idx)}
                            aria-label="Mover para baixo"
                            className="flex h-8 w-8 items-center justify-center rounded bg-white/20 text-white hover:bg-white/30 disabled:opacity-30"
                          >
                            <ArrowDown size={16} weight="bold" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemovePage(idx)}
                            aria-label="Remover página"
                            className="flex h-8 w-8 items-center justify-center rounded bg-red-600/80 text-white hover:bg-red-600"
                          >
                            <Trash size={16} weight="bold" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Workflow & Progress Section for R3 Backend Gap */}
          <div className="rounded-[8px] bg-[#202024] p-4 text-xs text-[#a8a8b3]">
            {/* TODO(backend-integration): Endpoint de workflow editorial e progresso de etapas (ex: GET/PUT /api/admin/capitulo/{id}/workflow). O Tsundoku API armazena apenas nomes de responsáveis (Tradutor, Revisor, QC) em campos de texto no CapituloDTO sem persistência de status por etapa. */}
            {/* TODO(backend-integration): Endpoint para upload e download de arquivos brutos/tradução de trabalho (ex: POST/GET /api/admin/capitulo/{id}/anexos). O Tsundoku API não implementa repositório de arquivos auxiliares de edição. */}
            <p className="font-semibold text-[#e1e1e6]">
              Etapas editoriais e fluxo de trabalho:
            </p>
            <p className="mt-1">
              Tradução e revisão vinculadas aos responsáveis informados acima.
              (Progresso automatizado aguardando endpoint no backend).
            </p>
          </div>

          {/* Action Buttons matching Figma 1258:113886 */}
          <div className="flex items-center justify-end gap-3 pt-2">
            {!isNew && isAdmin && (
              <button
                type="button"
                onClick={() => setShowDeleteModal(true)}
                disabled={isSubmitting}
                className="flex h-10 items-center justify-center gap-1.5 rounded-[4px] border border-red-500/40 bg-red-500/20 px-5 text-sm font-semibold text-red-400 transition-colors hover:bg-red-500 hover:text-white"
              >
                <Trash size={16} weight="bold" />
                <span>Excluir</span>
              </button>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex h-10 items-center justify-center rounded-[4px] bg-[#259cc1] px-6 text-sm font-semibold text-[#121214] transition-colors hover:bg-[#2082a2] disabled:opacity-50"
            >
              {isSubmitting ? 'Salvando...' : isNew ? 'Adicionar' : 'Salvar'}
            </button>
          </div>
        </form>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-md rounded-lg border border-appCardBorder bg-[#202024] p-6 shadow-xl">
            <h3 className="text-lg font-bold text-white">Excluir Capítulo</h3>
            <p className="mt-2 text-sm text-[#a8a8b3]">
              Tem certeza que deseja excluir este capítulo? Esta ação é
              irreversível.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="rounded-[4px] bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20"
                disabled={isSubmitting}
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="rounded-[4px] bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-50"
                disabled={isSubmitting}
              >
                Confirmar Exclusão
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
