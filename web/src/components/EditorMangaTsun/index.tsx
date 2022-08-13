import InputFiles from "components/Common/InputFiles/InputFiles";
import React, { Dispatch, SetStateAction, useState } from "react";
import Container, { ContainerImagens, ListaImagens } from "./styles";

interface Imagens {
    nome: string;
    url: string;
}

interface IEditorMangaTsun {
    valorconteudoImagensCapitulo: Array<any>;
    setValorconteudoImagensCapitulo: Dispatch<SetStateAction<Array<any>>>;
    conteudoImagensCapitulo?: Array<Imagens> | any;
}

const EditorMangaTsun: React.FC<IEditorMangaTsun> = ({ setValorconteudoImagensCapitulo, conteudoImagensCapitulo }) => {
    const [filesPreview, setFilesPreview] = useState<any[]>(conteudoImagensCapitulo);
    const fileArray: Imagens[] = [];
    const fileObj: any[] = [];    

    const uploadPreviewImagens = (e: any) => {
        fileObj.push(e.target.files);

        for (let i = 0; i < fileObj[0].length; i++) {
            const nomeImagem = fileObj[0][i].name;
            if (!fileArray.includes(nomeImagem)) {
                const imagens: Imagens = {
                    nome: nomeImagem,
                    url: URL.createObjectURL(fileObj[0][i]),
                };
                fileArray.push(imagens);
            }
        }

        setFilesPreview(fileArray);
        setValorconteudoImagensCapitulo(fileObj);
    };

    return (
        <Container>
            <InputFiles 
                classNameInput="inputIncluiCapaPrincipal" 
                idInput="ArrayImagensCapitulo" 
                nameInput="ArrayImagensCapitulo" 
                multipleInput={true}
                onChangeInput={(e: any) => uploadPreviewImagens(e)}
                typeInput={"file"}  
            />

            <ContainerImagens larguraContainerImagens="1010px">              

                {(filesPreview || []).map((url: any) => (
                    <ListaImagens>
                        <img key={url.nome} src={url.url} width={1000} alt={url.nome}></img>
                    </ListaImagens>
                ))}
            </ContainerImagens>
        </Container>
    );
};

export default EditorMangaTsun;
