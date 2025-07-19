import { Editor } from './editor';
import { Toolbar } from './toolbar';

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
      <Toolbar />
      <Editor />
    </div>
  );
}
