import React, { Dispatch, SetStateAction, useState } from "react";
import { Container } from "./styles";

interface Imagens {
    nome: string;
    url: string;
}

interface IEditorMangaTsun {
    valorconteudoImagensCapitulo: Array<any>;
    setValorconteudoImagensCapitulo: Dispatch<SetStateAction<Array<any>>>;
}

const EditorMangaTsun: React.FC<IEditorMangaTsun> = ({
    setValorconteudoImagensCapitulo,
}) => {
    const [filesPreview, setFilesPreview] = useState<any>([]);
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
            <input
                className="inputIncluiCapaPrincipal"
                id="ArrayImagensCapitulo"
                name="ArrayImagensCapitulo"
                type="file"
                onChange={(e: any) => uploadPreviewImagens(e)}
                multiple
            />

            <div>
                {(filesPreview || []).map((url: any) => (
                    <img
                        key={url.nome}
                        src={url.url}
                        width={500}
                        alt={url.nome}
                    ></img>
                ))}
            </div>
        </Container>
    );
};

export default EditorMangaTsun;
