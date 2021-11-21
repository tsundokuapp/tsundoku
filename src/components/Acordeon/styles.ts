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
    background-color: #21aeca;
    padding: 1rem;
    width: 300px;
    

    :hover{
        background-color: #3ab4cc;
    }
`;
  
  
  export const Conteudo = styled.div`
      width: 300px;
      padding: 1rem;
      background-color: #39b9d2;
      display: flex;
      flex-direction: column;
      justify-content: center;
  `;


export const CapaVolume = styled.img`
  //border: 3px solid ${(props) => props.theme.colors.secundaria};
  border-radius: 5px;
  width: 260px;
  height: 400px;
  margin-bottom: 5px;
`;

export const ConteudoCapitulos = styled.div`
    width: 250px;
    padding: 5px;
`;

  export default Container;