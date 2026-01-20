'use client';

import { Spinner } from '@phosphor-icons/react/dist/ssr';

import { useAdminChapterNovel } from '@/hooks/usePrivateApi';

import { Editor } from './Editor';
import { NavBarEditor } from './NavbarEditor';
import { Toolbar } from './Toolbar';

interface DocumentEditorProps {
  documentId: string;
}

export default function DocumentEditor({
  params,
}: {
  params: DocumentEditorProps;
}) {
  const { documentId } = params;
  const {
    data: chapterNovelResponse,
    isLoading,
    isError,
  } = useAdminChapterNovel(documentId);

  if (isError) {
    return (
      <div className="min-h-screen bg-appBackground">
        <div className="flex h-screen items-center justify-center">
          <p className="text-red-500">Erro ao carregar o capítulo.</p>
        </div>
      </div>
    );
  }

  const LoadingContent = () => (
    <div className="flex items-center justify-center gap-4">
      <span>Carregando...</span>
      <Spinner size={24} className="animate-spin" />
    </div>
  );

  return (
    <>
      {isLoading ? (
        <LoadingContent />
      ) : (
        <div className="min-h-screen bg-appBackground">
          <div className="fixed left-0 right-0 top-0 z-10 flex flex-col gap-y-2 bg-appGroupBackground px-4 print:hidden">
            <NavBarEditor
              id={documentId}
              title={chapterNovelResponse?.titulo}
            />
            <Toolbar />
          </div>
          <div className="pt-[114px] print:pt-0">
            <Editor contentEditor={chapterNovelResponse?.conteudoNovel} />
          </div>
        </div>
      )}
    </>
  );
}
