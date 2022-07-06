import styled from 'styled-components';

const Container = styled.nav`
    width: 100%;
    height: 200px;
`;

export const ListaMenu = styled.ul`
    display: flex;
    flex-direction: column;
`;

export const ItemLista = styled.li`    
    list-style: none;
    border-bottom: 1px solid ${props => props.theme.colors.branca};
    height: auto;
    display: flex;
    align-items: center;
    padding: 5px 0 5px 15px;
    margin-top: 2px;
    margin-bottom: 5px;
    color: ${props => props.theme.colors.branca};
    opacity: 0.7;
    cursor: pointer;

    > a{
        padding-left: 5px;
        text-decoration: none;        
        color: ${props => props.theme.colors.branca}
    }

    :hover{
        opacity: unset;
    }

    :nth-child(2){
        flex-wrap: wrap;
    }
`;

export const ListaSubMenu = styled.ul`    
    margin: 10px 0 10px 15px;
`;

export const ItemSubLista = styled.ul`    
    list-style: none;
    height: auto;
    display: flex;
    align-items: center;
    padding: 5px 0 0 15px;
    margin-bottom: 2px;
    color: ${props => props.theme.colors.branca};
    
    cursor: pointer;

    > a{        
        text-decoration: none;        
        color: ${props => props.theme.colors.branca}
    }

    :hover{
        opacity: 0.7;
    }

    ::before{
        content: "➣";
        margin-right: 5px;
    }
`;

export default Container;