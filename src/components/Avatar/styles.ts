import styled from 'styled-components';

export const Container = styled.div`
    width: 150px;
    height: 200px;    
    display: flex;
    flex-direction: column;
    align-items: center;

`;

export const ImagemAvatar = styled.img`
    border: 3px solid ${(props) => props.theme.colors.secundaria};
    border-radius: 100px;
    width: 120px;
    height: 120px;
    margin-bottom: 10px;
`;