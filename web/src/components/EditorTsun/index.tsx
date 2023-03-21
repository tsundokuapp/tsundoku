import dynamic from "next/dynamic";
import React, {useRef, Dispatch, SetStateAction} from 'react';

import SunEditorCore from "suneditor/src/lib/core";
import 'suneditor/dist/css/suneditor.min.css';
import { Container } from './styles';

const SunEditor = dynamic(() => import("suneditor-react"), {
    ssr: false,
  });

  interface IEditorTsun {
    larguraEditor: string;
    tamanhoEditor: string;
    valorConteudoEditor: string;
    setValorConteudoEditor: Dispatch<SetStateAction<string>>;
  }  

const EditorTsun = ({larguraEditor, tamanhoEditor, valorConteudoEditor, setValorConteudoEditor}: IEditorTsun) => {  
    const editor = useRef<SunEditorCore>();
    const getSunEditorInstance = (sunEditor: SunEditorCore) => {
        editor.current = sunEditor;
    };

    function handleChange(content: any | string){
        setValorConteudoEditor(content)
    }

    let valorAjusteTamanhoEditor = 0;

    function handleOnResizeEditor(prevHeight:number){
        valorAjusteTamanhoEditor =  prevHeight;
    }

    return (
        <Container ajusteLarguraEditor={larguraEditor} ajusteTamanhoEditor={valorAjusteTamanhoEditor}>            
            <SunEditor getSunEditorInstance={getSunEditorInstance} lang="pt_br" setAllPlugins={true} onChange={handleChange} width={larguraEditor} height={tamanhoEditor} onResizeEditor={handleOnResizeEditor} setContents={valorConteudoEditor} setOptions={{				    
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
        </Container>
    );
}

export default EditorTsun;
