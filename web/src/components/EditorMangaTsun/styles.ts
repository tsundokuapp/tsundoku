import styled from 'styled-components';

interface IContainerImagens{
    larguraContainerImagens: string;
}

const Container = styled.div`
    margin: 10px 0 10px 0;
    width: 90%;
`; 

export const ContainerImagens = styled.ul<IContainerImagens>`
    margin: 10px 0;
    width: ${(props) => props.larguraContainerImagens};

    @media (max-width: 1300px) {
        width: 900px;
    }
    
    @media (max-width: 1200px) {
        width: 800px;
    } 

    @media (max-width: 1080px) {
        width: 700px;
    } 

    @media (max-width: 975px) {
        width: 600px;
    }
    
    @media (max-width: 855px) {
        width: 500px;
    } 

    @media (max-width: 785px) {
        width: 400px;
    } 

    @media (max-width: 685px) {
        width: 300px;
    }
    
`;

export const ListaImagens = styled.li`
    list-style: none;
    margin-bottom: 2px;
    text-align: center;
    width: 100%;
    

    > img {
        border-radius: 7px;
        width: 100%;
    }

      
`;

export default Container;
