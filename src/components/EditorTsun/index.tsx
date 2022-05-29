import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const EditorTsun: React.FC = () => {
    
    //const editorRef = useRef(null);
    const log = (content: any) => {
        console.log("Deu certo!!", content);
    };
  
    const handleEditorChange = (content: any, editor: any) => {
        console.log("Content was updated:", content);
      };

    const useDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    return (
        <>
        <Editor
          //onInit={(evt, editor) => editorRef.current = editor}
          initialValue="<p>This is the initial content of the editor.</p>"
          init={{
            height: 500,
            menubar: false,
            plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
              'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
              'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
            ],
            toolbar: 'undo redo | blocks | ' +
              'bold italic forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | link | anchor | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            content_css: useDarkMode ? 'dark' : 'default',
            skin: useDarkMode ? 'oxide-dark' : 'oxide',            
          }}
          onEditorChange={handleEditorChange}
        />
        <button onClick={log}>Log editor content</button>
      </>
    );
  };
  
  export default EditorTsun;