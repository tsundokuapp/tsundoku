import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0 0 0;
  margin-left: 50px;
`;

export const ContainerForm = styled.div`
  width: auto;
  display: flex;
  margin-right: 10px;

  @media (max-width: 474px) {
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    margin-left: -40px;

    .inputIncluiCapaPrincipal{
      margin-bottom: 430px !important
    }
  }

  @media (min-width: 1048px) {
    .label-editor-tsun{
      margin-top: 100px;
    }
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
  }

  .botao-submit {
    width: 90px;
    height: 25px;
    color: ${(props) => props.theme.colors.branca};
    font-size: 9pt;
    border-radius: 3px;
    margin: 15px 10px 30px 0;

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
  }

  .InputCampoDados {
    height: 35px;
    width: 95%;
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

  .InputCampoDadosNumber{
    width: 30%;
  }

  .inputText {
    height: 100px;
  }

  .hidden {
    visibility: hidden;
  }

  .inputIncluiCapaPrincipal {
    width: 80%;
    height: 35px;
    border-radius: 5px;
    font-size: 100%;
    margin: 5px 0 20px 0;
  }

`;

export const SecaoBotoesSubmit = styled.div`
  width: 100%;
  margin: 15px 0 30px 0;
  display: flex;
  justify-content: between;
 
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
  align-items: center;
  margin-top: 25px;

  .checkBoxOutrasInformacoes {
    margin-right: 5px;
  }

  .selectTipoObras {
    color: ${(props) => props.theme.colors.branca};
    background-color: ${(props) => props.theme.colors.quartiaria};
    height: 35px;
    width: 125px;
  }

  @media (max-width: 474px) {    
    width: 350px;
    margin-right: 75px;
    margin-left: 25px;
  }

`;

export const SecaoGeneros = styled.div`
  height: 250px;
  width: auto;
  max-width: 300px;
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
  width: auto;
  display: flex;
  justify-content: flex-start;
  height: 100%;

  @media (max-width: 474px) {  
      margin-top: -580px;
  }

`;

export const ImagemCapaObraPrincipal = styled.img`
  border: 3px solid ${(props) => props.theme.colors.secundaria};
  border-radius: 5px;
  width: 290px;
  height: 390px;
  margin-bottom: 10px;
`;

export default Container;
