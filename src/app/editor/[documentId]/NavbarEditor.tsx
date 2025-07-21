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
import { useEditorStore } from '@/store/useEditor';

import { DocumentInput } from './DocumentInput';

export const NavBarEditor = () => {
  const { editor } = useEditorStore();

  const insertTable = (rows: number, cols: number) => {
    editor
      ?.chain()
      .focus()
      .insertTable({ rows, cols, withHeaderRow: false })
      .run();
  };

  const onDownload = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const onSaveHtml = () => {
    if (!editor) return;

    const content = editor.getHTML();
    const blob = new Blob([content], { type: 'text/html' });
    onDownload(blob, 'document.html');
  };

  const onSaveText = () => {
    if (!editor) return;

    const content = editor.getText();
    const blob = new Blob([content], { type: 'text/plain' });
    onDownload(blob, 'document.txt');
  };

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
                      <MenubarItem onClick={onSaveHtml}>
                        <FileHtml className="mr-2 size-4" />
                        HTML
                      </MenubarItem>
                      <MenubarItem onClick={() => window.print()}>
                        <FilePdf className="mr-2 size-4" />
                        PDF
                      </MenubarItem>
                      <MenubarItem onClick={onSaveText}>
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
                  <MenubarItem
                    onClick={() => editor?.chain().focus().undo().run()}
                  >
                    <ArrowUUpLeft className="mr-2 size-4" />
                    Desfazer
                    <MenubarShortcut>Ctrl+Z</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem
                    onClick={() => editor?.chain().focus().redo().run()}
                  >
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
                      <MenubarItem onClick={() => insertTable(1, 1)}>
                        1 x 1
                      </MenubarItem>
                      <MenubarItem onClick={() => insertTable(2, 2)}>
                        2 x 2
                      </MenubarItem>
                      <MenubarItem onClick={() => insertTable(3, 3)}>
                        3 x 3
                      </MenubarItem>
                      <MenubarItem onClick={() => insertTable(4, 4)}>
                        4 x 4
                      </MenubarItem>
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
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().toggleBold().run()
                        }
                      >
                        <TextB className="mr-2 size-4" />
                        Negrito
                        <MenubarShortcut>Ctrl+B</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().toggleItalic().run()
                        }
                      >
                        <TextItalic className="mr-2 size-4" />
                        Itálico
                        <MenubarShortcut>Ctrl+I</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().toggleUnderline().run()
                        }
                      >
                        <TextUnderline className="mr-2 size-4" />
                        Sublinhado
                        <MenubarShortcut>Ctrl+U</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().toggleStrike().run()
                        }
                      >
                        <TextStrikethrough className="mr-2 size-4" />
                        Tachado&nbsp;&nbsp;
                        <MenubarShortcut>Ctrl+Shift+X</MenubarShortcut>
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem
                    onClick={() =>
                      editor?.chain().focus().unsetAllMarks().run()
                    }
                  >
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
