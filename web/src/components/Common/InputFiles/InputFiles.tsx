import React from "react";
import Container from "./style";

interface IInputFiles {
    classNameInput: string | undefined;
    idInput: string | undefined;
    nameInput: string | undefined;
    typeInput: React.HTMLInputTypeAttribute | undefined;
    onChangeInput: React.ChangeEventHandler<HTMLInputElement> | undefined;
    multipleInput: boolean | undefined;
}

const InputFiles: React.FC<IInputFiles> = ({classNameInput, idInput, nameInput, typeInput, onChangeInput, multipleInput}) => {

    return (
       <Container>
        Selecionar Imagens
        <input
                className={classNameInput}
                id={idInput}
                name={nameInput}
                type={typeInput}
                onChange={onChangeInput}
                multiple={multipleInput}
                accept="image/png, image/jpeg"
            />
       </Container>
    );
}

export default InputFiles;