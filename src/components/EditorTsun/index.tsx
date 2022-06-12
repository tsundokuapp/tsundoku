// if(typeof window !== 'undefined'){
//     require ('tinymce/tinymce');
//     require ('tinymce/themes/silver');
//     require ('tinymce/plugins/advlist');
//     require ('tinymce/plugins/autolink');
//     require ('tinymce/plugins/lists');
//     require ('tinymce/plugins/link');
//     require ('tinymce/plugins/image');
//     require ('tinymce/plugins/charmap');
//     //require ('tinymce/plugins/print');
//     require ('tinymce/plugins/preview');
//     require ('tinymce/plugins/anchor');
//     require ('tinymce/plugins/searchreplace');
//     require ('tinymce/plugins/visualblocks');
//     require ('tinymce/plugins/code');
//     require ('tinymce/plugins/fullscreen');
//     require ('tinymce/plugins/insertdatetime');
//     require ('tinymce/plugins/media');
//     require ('tinymce/plugins/table');
//     //require ('tinymce/plugins/paste');
//     require ('tinymce/plugins/code');
//     require ('tinymce/plugins/help');
//     require ('tinymce/plugins/wordcount');
// }

// import React, { useRef } from 'react';
// import dynamic from "next/dynamic";
// import { Editor } from '@tinymce/tinymce-react';
// import { Editor as TinyMCEEditor } from 'tinymce';

// // const EditorMce = dynamic(() => import('@tinymce/tinymce-react'), {
// //     ssr: false,
// //   });

// const EditorTsun: React.FC = () => {
    
//     const editorRef = useRef<TinyMCEEditor | null>(null);
//     const log = (content: any) => {
//         console.log("Deu certo!!", content);
//     };
  
//     const handleEditorChange = (content: any) => {
//         console.log("Content was updated:", content);
//       };

//     const useDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
//     return (
//         <div>
//         <EditorMce
//           onInit={(evt, editor) => editorRef.current = editor}
//           initialValue="This is the initial content of the editor."
//           init={{
//             height: 500,
//             menubar: false,
//             plugins: [
//               'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
//               'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
//               'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
//             ],
//             toolbar: 'undo redo | blocks | ' +
//               'bold italic forecolor | alignleft aligncenter ' +
//               'alignright alignjustify | bullist numlist outdent indent | ' +
//               'removeformat | link | anchor | help',
//             content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
//             content_css: useDarkMode ? 'dark' : 'default',
//             skin: useDarkMode ? 'oxide-dark' : 'oxide',            
//           }}
//           onEditorChange={handleEditorChange}
//         />
//         <button onClick={log}>Log editor content</button>
//       </div>
//     );
//   };
  
//   export default EditorTsun;


import React from 'react';

const EditorTsun: React.FC = () => {
    return (
        <p>
            Esse componente foi removido
        </p>
    );
}

export default EditorTsun;