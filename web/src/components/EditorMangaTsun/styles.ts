import styled from 'styled-components';

interface IContainerImagens{
    larguraContainerImagens: string;
}

const Container = styled.div`
    margin: 10px 0;
`; 

export const ContainerImagens = styled.ul<IContainerImagens>`
    margin: 10px 0;
    width: ${(props) => props.larguraContainerImagens}
    
`;

export const ListaImagens = styled.li`
    list-style: none;
    margin-bottom: 2px;
    text-align: center;
    

    > img {
        border-radius: 7px;
    }
`;

export default Container;
