import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0 0 0;
  margin-left: 50px;
`;

export const ContainerForm = styled.div`
  width: 100%;
  display: flex;
  margin-right: 10px;

  @media (max-width: 474px) {
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    margin-left: -100px;
  }
`;

export const SecaoInputs = styled.section`
  width: 70%;
  display: flex;
  flex-direction: column;
  padding-top: 50px;
  padding-left: 20px;
  height: 700px;

  > form {
    display: flex;
    flex-direction: column;

    > label {
        width: 80%;
    }
  }

  .botao-submit {
    width: 150px;
    height: 30px;
    color: ${(props) => props.theme.colors.branca};
    font-size: 9pt;
    border-radius: 3px;
    margin: 15px 15px 30px 0;

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
      opacity: 0.7;
    }

    > a{
        text-decoration: none;
        color: ${(props) => props.theme.colors.branca};
    }
  }

  .selectTipoObras {
    color: ${(props) => props.theme.colors.branca};
    background-color: ${(props) => props.theme.colors.quartiaria};
    height: 35px;    
    padding-left: 10px;
    border-radius: 5px;
    margin: 5px 0 20px 0;
    width: 155px;
  }

  .InputCampoDados {
    height: 35px;
    padding-left: 10px;
    border-radius: 5px;
    font-size: 100%;
    margin: 5px 0 20px 0;
    outline: none;
    color: ${(props) => props.theme.colors.branca};
    background-color: ${(props) => props.theme.colors.quartiaria};
    align-items: center;

    &:hover {
      border-color: white;
    }
  }

  .larguraInputsAuxiiar{
    width: 100px;
  }

  .inputText {
    height: 100px;
  }

  .botaoNovoVolume{
      margin-left: 10px;
  }

  .hidden {
    visibility: hidden;
  }

  @media (max-width: 474px) {
    .InputCampoDados{
      width: 120%;
    }
  } 

`;

export const SecaoBotoesSubmit = styled.div`
  width: 100%;
  margin: 15px 0 30px 0;
  display: flex;
`;

export const BotaoAlteracao = styled.button`
  width: 90px;
  height: 25px;
  color: ${(props) => props.theme.colors.branca};
  font-size: 9pt;
  border-radius: 3px;
  margin: 0 10px 0 10px;  

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
    opacity: 0.7;
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

export const SecaoCategorias = styled.div`
  height: 100px;
  width: 25%;
  margin: 5px 0 20px 0;
  padding: 15px 10px 10px 25px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.quartiaria};
  display: flex;
  flex-direction: column;

  .checkBoxCategorias {
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
