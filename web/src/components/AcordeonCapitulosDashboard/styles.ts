import styled from "styled-components";

const Container = styled.div`
   
    margin: 10px 5px;
`;

export const Titulo = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    cursor: pointer;
    background-color: ${(props) => props.theme.colors.secundaria};
    padding: 10px 5px;
    
    :hover {
        opacity: 0.7;
    }
`;

export const Conteudo = styled.div`   
    padding: 10px 5px;
    background-color: ${(props) => props.theme.colors.secundaria};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const CapaVolume = styled.img`
    border-radius: 5px;
    margin-bottom: 20px;
    width: 290px;
    height: 390px;
`;

export const ConteudoSinopse = styled.div`   
    padding: 5px;
    margin: 5px;
    text-indent: 30px;

    > p {        
        margin-bottom: 10px;
    }
`;

export const ConteudoCapitulos = styled.div`    
    padding: 10px 0;
    align-items: center;
    cursor: pointer;
    :hover {
        opacity: 0.7;
    }

    > a {
      text-decoration: none;
      color: ${(props) => props.theme.colors.branca}
    }
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

  &.quintiaria {
    background: ${(props) => props.theme.colors.quintiaria};
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
