import { Spinner } from '@phosphor-icons/react';
import {
  Check,
  FileDashed,
  FileText,
  UsersThree,
} from '@phosphor-icons/react/dist/ssr';

import { IVolumeNovelData } from '@/features/novels/api/types';
import { Avatar, AvatarImage } from '@/shared/components/ui/avatar';
import {
  THeadTable,
  Table,
  TitleColTable,
} from '@/shared/components/ui/table/index';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/components/ui/tooltip';
import { formatDate } from '@/shared/utils/date';

interface IChapterDocumentsTableProps {
  chapters: IVolumeNovelData['listaCapitulos'];
  onHandleClick?:
    | ((info: { title: string; id: string; idChapter: string }) => void)
    | undefined;
}

export const ChapterDocumentsTable = ({
  chapters,
  onHandleClick,
}: IChapterDocumentsTableProps) => {
  const RenderNovelRow = ({
    chapter,
  }: {
    chapter: IVolumeNovelData['listaCapitulos'][number];
  }) => {
    const isShared = true;
    const isFileDashed = false;
    const sizeDefault = 24;
    const colorTrue = '#0284C7';
    const colorFalse = '#0285c74d';

    return (
      <tr className="hidden hover:bg-appListHover md:table-row">
        <td className="px-4 py-2 text-center text-appText">
          {chapter.numeroCapitulo}
        </td>
        <TooltipProvider>
          <Tooltip>
            <TooltipContent>
              <p>{chapter.tituloCapitulo}</p>
            </TooltipContent>
            <TooltipTrigger>
              <td
                className="w-full cursor-pointer overflow-hidden truncate px-4 py-2 text-start text-sm font-medium text-appText"
                onClick={() =>
                  onHandleClick?.({
                    title: chapter.tituloCapitulo,
                    id: chapter.id,
                    idChapter: chapter.id,
                  })
                }
              >
                {chapter.tituloCapitulo}
              </td>
            </TooltipTrigger>
          </Tooltip>
        </TooltipProvider>

        <td className="px-4 py-2 text-center">
          <div className="flex flex-row justify-end gap-1">
            <div className="flex items-center justify-center hover:cursor-pointer">
              <TooltipProvider>
                <Tooltip>
                  <TooltipContent>{`Criador: Axios`}</TooltipContent>
                  <TooltipTrigger>
                    <Avatar className="h-8 min-h-8 w-8 min-w-8 p-0 ring-0">
                      <AvatarImage src="/cover-alya.webp" />
                    </Avatar>
                  </TooltipTrigger>
                </Tooltip>
              </TooltipProvider>
            </div>
            {/* adicionar no modelo "Pronto" ou "Em andamento" */}
            <div className="flex cursor-help items-center justify-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipContent>
                    {isFileDashed ? 'Em andamento' : 'Pronto'}
                  </TooltipContent>
                  <TooltipTrigger>
                    {isFileDashed ? (
                      <FileDashed size={sizeDefault} fill={colorFalse} />
                    ) : (
                      <FileText size={sizeDefault} fill={colorTrue} />
                    )}
                  </TooltipTrigger>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex cursor-help items-center justify-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipContent>
                    {chapter.publicado ? 'Postado' : 'Não Postado'}
                  </TooltipContent>
                  <TooltipTrigger>
                    {
                      <Check
                        size={sizeDefault}
                        fill={chapter.publicado ? colorTrue : colorFalse}
                      />
                    }
                  </TooltipTrigger>
                </Tooltip>
              </TooltipProvider>
            </div>
            {/* adicionar no modelo */}
            <div className="flex cursor-help items-center justify-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipContent>
                    {isShared ? 'Compartilhado' : 'Não compartilhado'}
                  </TooltipContent>
                  <TooltipTrigger>
                    {
                      <UsersThree
                        size={sizeDefault}
                        fill={isShared ? colorTrue : colorFalse}
                      />
                    }
                  </TooltipTrigger>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </td>
        <td className="hidden text-nowrap px-4 py-2 text-center text-appText md:table-cell">
          {formatDate(new Date(chapter.dataInclusao), true, false)}
        </td>
      </tr>
    );
  };

  return (
    <div className="w-full">
      {chapters === undefined ? (
        <div className="flex items-center justify-center gap-4">
          <span>Carregando...</span>
          <Spinner size={24} className="animate-spin" />
        </div>
      ) : (
        <>
          {chapters.length === 0 ? (
            <div className="py-4 text-center text-appText">
              Nenhum capítulo encontrado.
            </div>
          ) : (
            <div className="relative transition-all sm:rounded-lg">
              <Table>
                <THeadTable>
                  <tr>
                    <TitleColTable title="Nº" />
                    <TitleColTable title="Título" />
                    <TitleColTable title="Infos" hiddenCell="md" />
                    <TitleColTable title="Data Criação" hiddenCell="md" />
                  </tr>
                </THeadTable>
                <tbody>
                  {chapters.map((chapter) => (
                    <RenderNovelRow key={chapter.id} chapter={chapter} />
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </>
      )}
    </div>
  );
};
