import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ContainerForm = styled.div`
  width: 100%;
  display: flex;
`;

export const SecaoInputs = styled.section`
  width: 65%;
  display: flex;
  flex-direction: column;
  padding-top: 50px;
  padding-left: 20px;
  height: 700px;

  > form {
    display: flex;
    flex-direction: column;
  }

  .botao-submit {
    width: 90px;
    height: 25px;
    color: ${(props) => props.theme.colors.branca};
    font-size: 9pt;
    border-radius: 3px;
    margin: 15px 0 30px 0;
    opacity: 0.7;

    &.sucesso {
      background: ${(props) => props.theme.colors.sucesso};
    }

    &.aviso {
      background: ${(props) => props.theme.colors.aviso};
    }

    &.secundaria {
      background: ${(props) => props.theme.colors.secundaria};
    }

    :hover {
      opacity: 1;
    }
  }

  .InputCampoDados {
    height: 35px;
    width: 80%;
    padding-left: 10px;
    border-radius: 5px;
    font-size: 100%;
    margin: 5px 0 20px 0;
    outline: none;
    color: ${(props) => props.theme.colors.branca};
    background-color: ${(props) => props.theme.colors.quartiaria};

    &:hover {
      border-color: white;
    }
  }

  .inputText {
    height: 100px;
  }
`;

export const SecaoBotoesSubmit = styled.div`
  width: 40%;
  margin: 15px 0 30px 0;
  display: flex;
  justify-content: space-around;
`;

export const BotaoAlteracao = styled.button`
  width: 90px;
  height: 25px;
  color: ${(props) => props.theme.colors.branca};
  font-size: 9pt;
  border-radius: 3px;
  margin: 0 10px 0 10px;
  opacity: 0.7;

  &.sucesso {
    background: ${(props) => props.theme.colors.sucesso};
  }

  &.aviso {
    background: ${(props) => props.theme.colors.aviso};
  }

  &.secundaria {
    background: ${(props) => props.theme.colors.secundaria};
  }

  :hover {
    opacity: 1;
  }
`;

export const SecaoOutrasInformacoes = styled.div`
  width: 80%;
  height: 35px;
  display: flex;
  justify-content: space-around;

  .checkBoxOutrasInformacoes {
    margin-right: 5px;
  }

  .selectTipoObras {
    color: ${(props) => props.theme.colors.branca};
    background-color: ${(props) => props.theme.colors.quartiaria};
    height: 30px;
  }
`;

export const SecaoGeneros = styled.div`
  height: 100px;
  width: 25%;
  margin: 5px 0 20px 0;
  padding: 15px 10px 10px 25px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.quartiaria};
  display: flex;
  flex-direction: column;

  .checkBoxGeneros {
    margin-right: 5px;
    margin-bottom: 10px;
  }

  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.secundaria};
    border-radius: 3px;
  }
`;

export const InputIncluiCapaPrincipal = styled.input.attrs(() => ({
  type: "file",
}))`
  width: 80%;
  height: 35px;
  border-radius: 5px;
  font-size: 100%;
  margin: 5px 0 20px 0;
`;

export const SecaoCapaObra = styled.section`
  width: 35%;
  display: flex;
  justify-content: center;
  height: 700px;
`;

export const ImagemCapaObraPrincipal = styled.img`
  border: 3px solid ${(props) => props.theme.colors.secundaria};
  border-radius: 5px;
  width: 250px;
  height: 400px;
  margin-bottom: 10px;
`;

export default Container;
