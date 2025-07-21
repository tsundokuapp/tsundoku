'use client';

import {
  ArrowUUpLeft,
  File,
  FileHtml,
  FilePdf,
  FilePlus,
  FileText,
  NotePencil,
  Printer,
  TextB,
  TextItalic,
  TextStrikethrough,
  TextT,
  TextTSlash,
  TextUnderline,
  Trash,
} from '@phosphor-icons/react/dist/ssr';

import { LogoLink } from '@/components/common/logoLink/LogoLink';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from '@/components/shadcn/menubar';

import { DocumentInput } from './DocumentInput';

const tsunColor = '#0284C7';

export const NavBarEditor = () => {
  return (
    <nav className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <LogoLink label="Tsun Editor" />
        <div className="flex flex-col">
          <DocumentInput />
          <div className="flex">
            <Menubar className="h-auto border-none bg-transparent p-0 text-white shadow-none">
              <MenubarMenu>
                <MenubarTrigger className="hover-bg-muted h-auto rounded-sm px-[7px] py-0.5 text-sm font-normal">
                  Arquivo
                </MenubarTrigger>
                <MenubarContent className="print:hidden">
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <File className="mr-2 size-4" />
                      Salvar
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem>
                        <FileHtml className="mr-2 size-4" />
                        HTML
                      </MenubarItem>
                      <MenubarItem>
                        <FilePdf className="mr-2 size-4" />
                        PDF
                      </MenubarItem>
                      <MenubarItem>
                        <FileText className="mr-2 size-4" />
                        Texto
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem>
                    <FilePlus className="mr-2 size-4" />
                    Novo Documento&nbsp;&nbsp;
                    <MenubarShortcut>Ctrl+N</MenubarShortcut>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>
                    <NotePencil className="mr-2 size-4" />
                    Renomear
                  </MenubarItem>
                  <MenubarItem>
                    <Trash className="mr-2 size-4" />
                    Excluir
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem onClick={() => window.print()}>
                    <Printer className="mr-2 size-4" />
                    Imprimir
                    <MenubarShortcut>Ctrl+P</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="hover-bg-muted h-auto rounded-sm px-[7px] py-0.5 text-sm font-normal">
                  Editar
                </MenubarTrigger>
                <MenubarContent className="print:hidden">
                  <MenubarItem>
                    <ArrowUUpLeft className="mr-2 size-4" />
                    Desfazer
                    <MenubarShortcut>Ctrl+Z</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem>
                    <ArrowUUpLeft className="mr-2 size-4 rotate-180" />
                    Refazer
                    <MenubarShortcut>Ctrl+Y</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="hover-bg-muted h-auto rounded-sm px-[7px] py-0.5 text-sm font-normal">
                  Inserir
                </MenubarTrigger>
                <MenubarContent className="print:hidden">
                  <MenubarSub>
                    <MenubarSubTrigger>Tabela</MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem>1 x 1</MenubarItem>
                      <MenubarItem>2 x 2</MenubarItem>
                      <MenubarItem>3 x 3</MenubarItem>
                      <MenubarItem>4 x 4</MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="hover-bg-muted h-auto rounded-sm px-[7px] py-0.5 text-sm font-normal">
                  Formatar
                </MenubarTrigger>
                <MenubarContent className="print:hidden">
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <TextT className="mr-2 size-4" />
                      Texto
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem>
                        <TextB className="mr-2 size-4" />
                        Negrito
                        <MenubarShortcut>Ctrl+B</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem>
                        <TextItalic className="mr-2 size-4" />
                        Itálico
                        <MenubarShortcut>Ctrl+I</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem>
                        <TextUnderline className="mr-2 size-4" />
                        Sublinhado
                        <MenubarShortcut>Ctrl+U</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem>
                        <TextStrikethrough className="mr-2 size-4" />
                        Tachado&nbsp;&nbsp;
                        <MenubarShortcut>Ctrl+Shift+X</MenubarShortcut>
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem>
                    <TextTSlash className="mr-2 size-4" />
                    Limpar Formatação
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </div>
    </nav>
  );
};
