
import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Editor as TinyMCEEditor } from 'tinymce';

const EditorAxios: React.FC = () => {
  
  const editorRef = useRef<TinyMCEEditor | null>(null);
  
  return (
      <div>
      <Editor
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue="esse é o editor do axios"
        init={{
          height: 500,
          menubar: false,
          }}
      />
    </div>
  );
};

export default EditorAxios;