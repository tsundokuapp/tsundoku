import dynamic from "next/dynamic";
import React, {useRef, Dispatch, SetStateAction} from 'react';

import SunEditorCore from "suneditor/src/lib/core";
import 'suneditor/dist/css/suneditor.min.css';

const SunEditor = dynamic(() => import("suneditor-react"), {
    ssr: false,
  });

  interface IEditorTsun {
    name: string;
    setValorSinopse: Dispatch<SetStateAction<string>>;
  }  

const EditorTsun: React.FC<IEditorTsun> = ({name, setValorSinopse}) => {
   

    const editor = useRef<SunEditorCore>();

    // The sunEditor parameter will be set to the core suneditor instance when this function is called
    const getSunEditorInstance = (sunEditor: SunEditorCore) => {
        editor.current = sunEditor;
    };

    function handleChange(content: any | string){
        console.log(content); //Get Content Inside Editor
        setValorSinopse(content)
    }    

    return (
        <div>
            <p>Testando um novo componente de edição de texto</p>
            <SunEditor getSunEditorInstance={getSunEditorInstance} lang="pt_br" name={name} setAllPlugins={true} onChange={handleChange} setOptions={{				    
					buttonList: [['undo',
                    'redo',
                    'font',
                    'fontSize',
                    'formatBlock',
                    'paragraphStyle',
                    'blockquote',
                    'bold',
                    'underline',
                    'italic',
                    'strike',
                    'subscript',
                    'superscript',
                    'fontColor',
                    'hiliteColor',
                    'textStyle',
                    'removeFormat',
                    'outdent',
                    'indent',
                    'align',
                    'horizontalRule',
                    'list',
                    'lineHeight',
                    'table',
                    'link',
                    'image',
                    'video',
                    'audio',			
                    'imageGallery',
                    'fullScreen',
                    'showBlocks',
                    'codeView',
                    'preview',
                    'print',
                    'save',
                    'template']]
			}}  />
        </div>
    );
}

/*

            

*/


export default EditorTsun;