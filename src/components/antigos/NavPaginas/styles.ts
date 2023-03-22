import styled from 'styled-components';

interface INavPaginas{
   ajuste : boolean | undefined;
}

const Container = styled.div<INavPaginas>`
    margin-left: 15px;
    width: 200px;
    height: auto;
    display: flex;
    align-items: center;
    
    > h3{
        margin: 0 0 0 3px;
    }

    @media (max-width: 474px) {
        margin-left: ${(props) => props.ajuste === true ? '-70px' : '-5px'};
    }
`;

export default Container;