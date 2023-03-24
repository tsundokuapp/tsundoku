import styled from 'styled-components';

interface IContainer{
    ajusteLarguraEditor: string; 
    ajusteTamanhoEditor: number; 
}

export const Container = styled.div<IContainer>`
    
    width: ${(props) => props.ajusteLarguraEditor};
    height: ${(props) => props.ajusteTamanhoEditor} + 'px';
    margin: 10px 0 10px 0;  

    @media (min-width: 500px) {
        width: 150%;
    }

    @media (max-width: 474px) {
        width: 140%;
    }   
`;
