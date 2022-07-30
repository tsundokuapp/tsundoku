import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SecaoTitulo = styled.div`
    width: 100%;
    height: 50px;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const SecaoIndiceCapitulos = styled.div`
    width: 100%;
    margin-bottom: 10px;
    padding: 10px 0 10px 0;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;    

    >h2{
        margin-bottom: 10px;
    }
`;

export const SecaoConteudoCapitulos = styled.div`
    width: 90%;
    margin: 10px 0 10px 0;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;   
`;

export const SecaoBotoesAdicao = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 10px;
`;

export const BotaoAlteracao = styled.button`
  width: 150px;
  height: 30px;
  color: ${(props) => props.theme.colors.branca};
  font-size: 10pt;
  border-radius: 3px;
  margin: 10px;
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

  > a{
    color: ${(props) => props.theme.colors.branca};
    text-decoration: none;
  }

`;

export default Container;
