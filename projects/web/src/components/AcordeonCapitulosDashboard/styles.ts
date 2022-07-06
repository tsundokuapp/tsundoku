import styled from 'styled-components';

const Container = styled.div`
    max-width: 600px;
    margin: 2rem auto;
`;


export const Titulo = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    cursor: pointer;
    background-color: ${(props) => props.theme.colors.secundaria};
    padding: 1rem;
    width: 290px;
    

    :hover{
        opacity: 0.7;
    }
`;
  
  
  export const Conteudo = styled.div`
      width: 290px;
      padding: 1rem;
      background-color: ${(props) => props.theme.colors.secundaria};
      display: flex;
      flex-direction: column;
      justify-content: center;
  `;


export const CapaVolume = styled.img`
  border-radius: 5px;
  width: 260px;
  height: 400px;
  margin-bottom: 20px;
`;

export const ConteudoCapitulos = styled.div`
    width: 250px;
    padding: 5px;
`;

  export default Container;