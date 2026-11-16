'use client';

import {
  CaretDown,
  MagnifyingGlass,
  PencilSimple,
  Plus,
  Trash,
} from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import { useMemo, useState } from 'react';

import { useAuthStore } from '@/core/auth/stores/useAuthStore';
import { usePrivateComics } from '@/features/admin/comics/hooks/usePrivateComics';
import { deleteNovelChapter } from '@/features/admin/novels/api/novelAdminApi';
import { usePrivateNovels } from '@/features/admin/novels/hooks/usePrivateNovels';
import { useVolumesNovel } from '@/features/novels/hooks/usePublicNovels';
import { AdminBreadcrumbs } from '@/shared/components/layout/v22/AdminBreadcrumbs';
import { useToaster } from '@/shared/contexts/ToasterContext';

interface ChapterRowItem {
  id: string;
  numero: string;
  parte?: string;
  titulo: string;
  slug: string;
  autor: string;
  publicado: boolean;
  views: number;
  data: string;
  volumeId: string;
  volumeNumero?: string;
  obraSlug: string;
  worktype: 'novel' | 'comic';
}

export default function CapitulosGlobalPage() {
  const { isAdmin } = useAuthStore();
  const { toaster } = useToaster();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedObraId, setSelectedObraId] = useState<string>('all');
  const [selectedVolumeId, setSelectedVolumeId] = useState<string>('all');
  const [selectedWorktype, setSelectedWorktype] = useState<'novel' | 'comic'>(
    'novel',
  );
  const [deleteModalState, setDeleteModalState] = useState<{
    open: boolean;
    chapterId: string;
    chapterTitle: string;
  }>({
    open: false,
    chapterId: '',
    chapterTitle: '',
  });

  // Fetch novels & comics
  const { data: novelsResponse, isLoading: isLoadingNovels } =
    usePrivateNovels();
  const { data: comicsResponse, isLoading: isLoadingComics } =
    usePrivateComics();

  const novels = useMemo(
    () =>
      novelsResponse?.ok && Array.isArray(novelsResponse.data?.data)
        ? novelsResponse.data.data
        : [],
    [novelsResponse],
  );
  const comics = useMemo(
    () =>
      comicsResponse?.ok && Array.isArray(comicsResponse.data?.data)
        ? comicsResponse.data.data
        : [],
    [comicsResponse],
  );

  // Selected Obra
  const selectedNovel = useMemo(
    () => novels.find((n) => n.id === selectedObraId),
    [novels, selectedObraId],
  );

  // Fetch volumes for selected novel (if a novel is selected)
  const { data: volumesResponse } = useVolumesNovel(
    selectedObraId !== 'all' && selectedWorktype === 'novel'
      ? selectedObraId
      : '',
  );
  const volumes = useMemo(
    () => (Array.isArray(volumesResponse?.data) ? volumesResponse.data : []),
    [volumesResponse],
  );

  // Compile list of chapters from fetched volumes
  const allChapters = useMemo(() => {
    const list: ChapterRowItem[] = [];

    // If an obra with volumes is selected
    if (volumes.length > 0) {
      volumes.forEach((vol) => {
        if (selectedVolumeId !== 'all' && vol.id !== selectedVolumeId) return;

        vol.listaCapitulos?.forEach((cap) => {
          list.push({
            id: cap.id,
            numero: cap.numeroCapitulo,
            parte: cap.parteCapitulo,
            titulo: cap.tituloCapitulo || `Capítulo ${cap.numeroCapitulo}`,
            slug: cap.slugCapitulo || cap.id,
            autor: selectedNovel?.autor || 'Admin',
            publicado: cap.publicado ?? true,
            // TODO(backend-integration): RetornoCapitulo não possui Views; exibindo valor ilustrativo conforme Figma 1238:975 (50.000)
            views: 50000,
            data: cap.dataInclusao || '12/04/2023',
            volumeId: vol.id,
            volumeNumero: vol.numeroVolume,
            obraSlug: selectedNovel?.slug || 'obra',
            worktype: 'novel',
          });
        });
      });
    }

    return list;
  }, [volumes, selectedVolumeId, selectedNovel]);

  // Filter by search query
  const filteredChapters = useMemo(() => {
    if (!searchQuery.trim()) return allChapters;
    const query = searchQuery.toLowerCase();
    return allChapters.filter(
      (cap) =>
        cap.titulo.toLowerCase().includes(query) ||
        cap.numero.toLowerCase().includes(query) ||
        cap.autor.toLowerCase().includes(query),
    );
  }, [allChapters, searchQuery]);

  const handleDeleteChapter = async () => {
    if (!deleteModalState.chapterId) return;
    try {
      const res = await deleteNovelChapter(deleteModalState.chapterId, true);
      if (res.ok) {
        toaster({
          type: 'success',
          msg: 'Capítulo excluído com sucesso.',
        });
      } else {
        toaster({
          type: 'error',
          msg: 'Erro ao excluir o capítulo.',
        });
      }
    } catch {
      toaster({
        type: 'error',
        msg: 'Erro ao excluir o capítulo.',
      });
    } finally {
      setDeleteModalState({ open: false, chapterId: '', chapterTitle: '' });
    }
  };

  const currentObraSlug = selectedNovel?.slug || (novels[0]?.slug ?? 'obra');
  const addChapterHref = `/project/${selectedWorktype}/${currentObraSlug}/novo${
    selectedVolumeId !== 'all' ? `?volumeId=${selectedVolumeId}` : ''
  }`;

  return (
    <div className="flex w-full flex-col gap-6">
      {/* Top Header matching Figma 1238:975 */}
      <div className="flex flex-col gap-2">
        <AdminBreadcrumbs />
        <h1 className="text-xl font-bold text-[#e1e1e6]">Capítulos</h1>
      </div>

      {/* Control Bar matching Figma 1238:1079 & 1238:1059 */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-wrap items-center gap-3">
          {/* Search bar */}
          <div className="relative w-full sm:w-[320px]">
            <MagnifyingGlass
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6c757d]"
              size={18}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquisar Capítulos"
              className="h-10 w-full rounded-[8px] border border-transparent bg-[#202024] pl-10 pr-4 text-sm text-[#e1e1e6] placeholder-[#6c757d] transition-colors focus:border-[#259cc1] focus:outline-none"
            />
          </div>

          {/* Obra selector dropdown */}
          <div className="relative min-w-[220px]">
            <select
              value={selectedObraId}
              onChange={(e) => {
                const val = e.target.value;
                setSelectedObraId(val);
                setSelectedVolumeId('all');
                const isNovel = novels.some((n) => n.id === val);
                setSelectedWorktype(isNovel ? 'novel' : 'comic');
              }}
              className="h-10 w-full appearance-none rounded-[8px] border border-[#202024] bg-[#202024] px-3.5 pr-8 text-sm text-[#e1e1e6] focus:border-[#259cc1] focus:outline-none"
            >
              <option value="all">Todas as Obras</option>
              {novels.length > 0 && (
                <optgroup label="Novels">
                  {novels.map((n) => (
                    <option key={n.id} value={n.id}>
                      {n.titulo}
                    </option>
                  ))}
                </optgroup>
              )}
              {comics.length > 0 && (
                <optgroup label="Mangás">
                  {comics.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.titulo}
                    </option>
                  ))}
                </optgroup>
              )}
            </select>
            <CaretDown
              size={14}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#a8a8b3]"
            />
          </div>

          {/* Volume selector dropdown */}
          {selectedObraId !== 'all' && volumes.length > 0 && (
            <div className="relative min-w-[160px]">
              <select
                value={selectedVolumeId}
                onChange={(e) => setSelectedVolumeId(e.target.value)}
                className="h-10 w-full appearance-none rounded-[8px] border border-[#202024] bg-[#202024] px-3.5 pr-8 text-sm text-[#e1e1e6] focus:border-[#259cc1] focus:outline-none"
              >
                <option value="all">Todos os Volumes</option>
                {volumes.map((v) => (
                  <option key={v.id} value={v.id}>
                    Volume {v.numeroVolume}
                  </option>
                ))}
              </select>
              <CaretDown
                size={14}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#a8a8b3]"
              />
            </div>
          )}
        </div>

        {/* Add button */}
        <Link
          href={addChapterHref}
          className="flex h-10 items-center justify-center gap-1.5 rounded-[8px] bg-[#259cc1] px-4 text-sm font-semibold text-[#121214] shadow transition-colors hover:bg-[#2082a2]"
        >
          <Plus size={16} weight="bold" />
          <span>Adicionar</span>
        </Link>
      </div>

      {/* Chapters Table matching Figma 1268:29785 */}
      <div className="w-full space-y-2">
        {/* Table Header Row */}
        <div className="hidden h-[35px] items-center rounded-[8px] bg-[#202024] px-4 text-xs font-semibold text-[#a8a8b3] md:grid md:grid-cols-12 md:gap-4">
          <span className="col-span-5">Título</span>
          <span className="col-span-2">Autor</span>
          <span className="col-span-1 text-center">Status</span>
          <span className="col-span-1 text-center">Views</span>
          <span className="col-span-2 text-center">Data</span>
          <span className="col-span-1 text-right">Ações</span>
        </div>

        {/* Content Rows */}
        {isLoadingNovels || isLoadingComics ? (
          <div className="flex h-48 items-center justify-center text-sm text-[#a8a8b3]">
            Carregando capítulos...
          </div>
        ) : selectedObraId === 'all' ? (
          <div className="flex h-48 flex-col items-center justify-center gap-2 rounded-[8px] border border-dashed border-[#202024] p-6 text-center text-[#a8a8b3]">
            <p>
              Selecione uma obra acima para listar seus capítulos e volumes.
            </p>
          </div>
        ) : filteredChapters.length === 0 ? (
          <div className="flex h-48 flex-col items-center justify-center gap-2 rounded-[8px] border border-dashed border-[#202024] p-6 text-center text-[#a8a8b3]">
            <p>Nenhum capítulo encontrado para o filtro selecionado.</p>
          </div>
        ) : (
          filteredChapters.map((cap) => (
            <div
              key={cap.id}
              className="flex flex-col gap-2 rounded-[8px] bg-[#202024] p-3 transition-colors hover:bg-[#28282c] md:grid md:h-[60px] md:grid-cols-12 md:items-center md:gap-4 md:px-4 md:py-0"
            >
              <div className="col-span-5">
                <Link
                  href={`/project/${cap.worktype}/${cap.obraSlug}/${cap.slug}`}
                  className="line-clamp-1 text-sm font-medium text-[#e1e1e6] hover:text-[#259cc1]"
                >
                  {cap.titulo}
                </Link>
                {cap.volumeNumero && (
                  <span className="text-[11px] text-[#a8a8b3] md:hidden">
                    Vol. {cap.volumeNumero}
                  </span>
                )}
              </div>

              <div className="col-span-2 text-xs text-[#a8a8b3]">
                {cap.autor}
              </div>

              <div className="col-span-1 text-left md:text-center">
                <span
                  className={`inline-block rounded px-2 py-0.5 text-[10px] font-semibold uppercase ${
                    cap.publicado
                      ? 'bg-[#259cc1]/20 text-[#259cc1]'
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}
                >
                  {cap.publicado ? 'Publicado' : 'Rascunho'}
                </span>
              </div>

              {/* Views with R3 TODO */}
              <div
                title="Views ilustrativas (TODO: persistência no backend)"
                className="col-span-1 text-xs text-[#a8a8b3] md:text-center"
              >
                {cap.views.toLocaleString()}
              </div>

              <div className="col-span-2 text-xs text-[#a8a8b3] md:text-center">
                {cap.data}
              </div>

              <div className="col-span-1 flex items-center justify-end gap-2">
                <Link
                  href={`/project/${cap.worktype}/${cap.obraSlug}/${cap.slug}`}
                  aria-label={`Editar ${cap.titulo}`}
                  className="flex h-7 w-7 items-center justify-center rounded text-[#a8a8b3] transition-colors hover:bg-white/10 hover:text-white"
                >
                  <PencilSimple size={15} />
                </Link>

                {isAdmin && (
                  <button
                    type="button"
                    aria-label={`Excluir ${cap.titulo}`}
                    onClick={() =>
                      setDeleteModalState({
                        open: true,
                        chapterId: cap.id,
                        chapterTitle: cap.titulo,
                      })
                    }
                    className="flex h-7 w-7 items-center justify-center rounded text-red-400 transition-colors hover:bg-red-500/20 hover:text-red-300"
                  >
                    <Trash size={15} />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalState.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-md rounded-lg border border-appCardBorder bg-[#202024] p-6 shadow-xl">
            <h3 className="text-lg font-bold text-white">Excluir Capítulo</h3>
            <p className="mt-2 text-sm text-[#a8a8b3]">
              Tem certeza que deseja excluir o capítulo &quot;
              {deleteModalState.chapterTitle}&quot;? Esta ação é irreversível.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() =>
                  setDeleteModalState({
                    open: false,
                    chapterId: '',
                    chapterTitle: '',
                  })
                }
                className="rounded-[4px] bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleDeleteChapter}
                className="rounded-[4px] bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700"
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
