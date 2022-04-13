import styled from 'styled-components';

const Container = styled.div`
    /* max-width: 600px;
    margin: 2rem auto; */
`;


export const Titulo = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    cursor: pointer;
    background-color: ${(props) => props.theme.colors.primaria};
    //padding: 1rem;
    //width: 290px;
`;


  export const Conteudo = styled.div`
      //width: 290px;
      //padding: 1rem;
      background-color: ${(props) => props.theme.colors.primaria};
      display: flex;
      flex-direction: column;
      justify-content: center;
  `;



  export default Container;