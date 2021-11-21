import styled from 'styled-components';

export const Dropdown = styled.div`
    width: 30px;
    margin: 0;
    position: relative;
    user-select: none;
`;

export const DropdownBtn = styled.div`
    padding: 5px 0px 5px 0px;
    background-color: rgba(255,255,255,0.0);
    font-weight: bold;
    color: ${(props) => props.theme.colors.branca}; 
    display: flex;
    align-items: center;
    cursor: pointer;

`;

export const DropdownConteudo = styled.div`
    position: absolute;
    margin-top: 25%;
    //left: 0;
    padding: 5px 0 5px 0;
    background-color: rgba(255,255,255,0.0);
    color: ${(props) => props.theme.colors.branca}; 
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

export const DropdownItem = styled.div`
    margin-left: -3px;
    padding: 5px;
    cursor: pointer;
    transition: all 0.2s;

    :hover{
        opacity: 0.7;
    }
`;

