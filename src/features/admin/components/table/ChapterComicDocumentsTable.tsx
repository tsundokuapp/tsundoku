import { Spinner } from '@phosphor-icons/react';
import {
  Check,
  FileDashed,
  FileText,
  UsersThree,
} from '@phosphor-icons/react/dist/ssr';

import { IChapterComicData } from '@/features/comics/api/types';
import { formatDate } from '@/shared/utils/date';
import { Avatar, AvatarImage } from '@/shared/components/ui/avatar';
import {
  THeadTable,
  Table,
  TitleColTable,
} from '@/shared/components/ui/table/index';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/shared/components/ui/tooltip';

interface IChapterDocumentsTableProps {
  chapters: IChapterComicData[];
  onHandleClick?:
    | ((info: { title: string; id: string; idChapter: string }) => void)
    | undefined;
}

export const ChapterComicDocumentsTable = ({
  chapters,
  onHandleClick,
}: IChapterDocumentsTableProps) => {
  const RenderComicRow = ({ chapter }: { chapter: IChapterComicData }) => {
    const isShared = true;
    const isFileDashed = false;
    const sizeDefault = 24;
    const colorTrue = '#0284C7';
    const colorFalse = '#0285c74d';

    return (
      <tr className="hidden hover:bg-appListHover md:table-row">
        <td className="px-4 py-2 text-center text-appText">
          {chapter.ordemCapitulo}
        </td>
        <td
          className="cursor-pointer px-4 py-2 text-start text-sm font-medium text-appText"
          onClick={() =>
            onHandleClick?.({
              title: chapter.descritivoCapitulo,
              id: chapter.id,
              idChapter: chapter.id,
            })
          }
        >
          {chapter.descritivoCapitulo}
        </td>

        <td className="px-4 py-2 text-center">
          <div className="flex flex-row justify-end gap-1">
            <div className="flex items-center justify-center hover:cursor-pointer">
              <Tooltip>
                <TooltipContent>
                  <p>{`Criador: ${chapter.usuarioInclusao}`}</p>
                  <Avatar className="h-8 min-h-8 w-8 min-w-8 p-0 ring-0">
                    <AvatarImage src="/cover-alya.webp" />
                  </Avatar>
                </TooltipContent>
              </Tooltip>
            </div>
            {/* adicionar no modelo "Pronto" ou "Em andamento" */}
            <div className="flex cursor-help items-center justify-center">
              <Tooltip>
                <TooltipContent>
                  <p>{isFileDashed ? 'Em andamento' : 'Pronto'}</p>
                </TooltipContent>
                <TooltipTrigger>
                  {isFileDashed ? (
                    <FileDashed size={sizeDefault} fill={colorFalse} />
                  ) : (
                    <FileText size={sizeDefault} fill={colorTrue} />
                  )}
                </TooltipTrigger>
              </Tooltip>
            </div>
            <div className="flex cursor-help items-center justify-center">
              <Tooltip>
                <TooltipContent>
                  <p>{chapter.publicado ? 'Postado' : 'Não Postado'}</p>
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
            </div>
            {/* adicionar no modelo */}
            <div className="flex cursor-help items-center justify-center">
              <Tooltip>
                <TooltipContent>
                  <p>{isShared ? 'Compartilhado' : 'Não compartilhado'}</p>
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
            </div>
          </div>
        </td>
        <td className="hidden px-4 py-2 text-center text-appText md:table-cell">
          {formatDate(new Date(chapter.dataInclusao), true, false)}
        </td>
      </tr>
    );
  };

  return (
    <div>
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
            <div className="relative w-full transition-all sm:rounded-lg">
              <Table>
                <THeadTable>
                  <tr>
                    <TitleColTable title="Ordem" />
                    <TitleColTable title="Título" />
                    <TitleColTable title="Infos" hiddenCell="md" />
                    <TitleColTable title="Data Criação" hiddenCell="md" />
                  </tr>
                </THeadTable>
                <tbody>
                  {chapters.map((chapter) => (
                    <RenderComicRow key={chapter.id} chapter={chapter} />
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
