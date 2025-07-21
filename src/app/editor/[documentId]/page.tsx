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
  console.log('Document ID:', documentId);

  return (
    <div className="min-h-screen bg-[#FAFAFB]">
      <div className="fixed left-0 right-0 top-0 z-10 flex flex-col gap-y-2 bg-slate-800 px-4 print:hidden">
        <NavBarEditor />
        <Toolbar />
      </div>
      <div className="pt-[114px] print:pt-0">
        <Editor />
      </div>
    </div>
  );
}
