import styled from "styled-components";

interface ISecaoContentCard{
    visivel: boolean;
}

interface ISecaoContentLista{
    visivel: boolean;
}

interface ICardLista{
    cardLista: boolean;
}

const largura = {
  largura: "220px",
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Cards

export const SecaoContentCard = styled.section<ISecaoContentCard>`
  margin-top: 25px;  
  display: ${props => props.visivel ? 'flex' : 'none'};
  flex-wrap: wrap;  
`;

export const ImagemCardObra = styled.img`
  opacity: 1;
  border-radius: 5px;
  display: block;
  max-width: 100%;
  height: 100%;
  transition: 0.5s ease;
  backface-visibility: hidden;
`;

export const ContainerMeioCardObra = styled.div`
  transition: 0.5s ease;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
`;

export const CardObra = styled.li`
  width: ${largura.largura};
  height: 310px;
  border-radius: 5px;
  margin: 13px 10px 13px 17px;
  position: relative;
  display: flex;
  flex-direction: column;

  -webkit-transition: all 0.7s ease;
  transition: all 0.7s ease;

  :hover {
    box-shadow: 3px 5px 2px 1px rgba(0, 0, 0, 0.2);
    -webkit-transform:scale(1.1);
  transform:scale(1.1);
  }

  :hover ${ImagemCardObra} {
    opacity: 0.7;
  }

  :hover ${ContainerMeioCardObra} {
    opacity: 1;
  }
`;

export const ContainerTituloAcoesCardObra = styled.div<ICardLista>`
  width: ${props => props.cardLista ? largura.largura : '50%'}; 
  height: 100%; 
  background: ${(props) => props.theme.colors.primaria};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 10px 5px;

  .titulo-card-obra {
    color: ${(props) => props.theme.colors.branca};
    text-align: center;
  }
`;

export const ContainerBotoesAcaoCardObra = styled.div<ICardLista>`
  width: ${props => props.cardLista ? '110%' : '40%'}; 
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

export const BotaoAlteracao = styled.button`
  width: 90px;
  height: 25px;
  color: ${(props) => props.theme.colors.branca};
  font-size: 9pt;
  border-radius: 3px;
  margin: 0 10px 0 10px;
  opacity: 0.7;  

  a{
    text-decoration: none;
    color: ${(props) => props.theme.colors.branca};
  }

  &.sucesso {
    background: ${(props) => props.theme.colors.sucesso};
  }

  &.aviso {
    background: ${(props) => props.theme.colors.aviso};
  }

  &.secundaria {
    background: ${(props) => props.theme.colors.secundaria};
  }

  :hover{
    opacity: 1;
  }

`;


// Lista

export const BotaoTrocaCardLista = styled.button`
  width: 30px;
  height: 30px;  
  font-size: 9pt;
  border-radius: 5px;
  color: ${(props) => props.theme.colors.branca};
  background: ${(props) => props.theme.colors.secundaria};  
  align-items: center;
  margin-right: 4px;
  
  :hover{
    opacity: 0.7;
  }
`;

export const SecaoContentLista = styled.section<ISecaoContentLista>`
  margin-top: 25px;
  display: ${props => props.visivel ? 'flex' : 'none'}; 
  flex-direction: column;
  justify-content: center; 
  align-items: center;
  width: 100%;
`;

export const ListaObra = styled.li`
    height: 50px;
    width: 90%;
    background: ${props => props.theme.colors.primaria};
    list-style: none;
    border-radius: 5px;
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 25px;

    :hover{
        box-shadow: 3px 5px 2px 1px rgba(0, 0, 0, 0.2);
        margin-top: -2px;
        margin-right: 5px;
    }

`;

// Navegação

export const NavConsultas = styled.div`    
    width: 400px;
    height: auto;
    display: flex;
    align-items: center;
`;

export const InputPesquisa = styled.input.attrs(() => ({ type: "text" }))`
  height: 30px;
  width: 200px;  
  padding-left: 10px;
  border-radius: 5px;
  font-size: 100%;
  outline: none;
  background: #dedede; 
  color: ${props => props.theme.colors.primaria};  
`;  

export const BotaoPesquisar = styled.button`
  width: 30px;
  height: 30px;  
  font-size: 9pt;
  border-radius: 5px;
  color: ${(props) => props.theme.colors.branca};
  background: ${(props) => props.theme.colors.secundaria};  
  align-items: center;
  margin-left: 4px;
  
  :hover{
    opacity: 0.7;
  }

`;

export default Container;
