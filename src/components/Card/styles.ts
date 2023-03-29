import styled from "styled-components";

export const ContainerCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    // TODO: Adicionar essa cor no tema
    
    background-color: #3C4148;
    border-radius: 1rem;
    gap: 1rem;
   
    // TODO: Converter para rem
    // height: 400px;
    width: 230px;

    padding: 1rem 0.5rem 0.5rem 0.5rem;
    margin: 0 1rem 1rem 0;
`;

export const ContainerInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    // TODO: fixar um tamanho para o container
    
    // TODO: Verificar porque o ellipsis não está funcionando
    white-space: norap;                  
    overflow: none;
    text-overflow: ellipsis;

    strong {
        align-self: center;
        font-size: 1rem;
        display: inline;
    }
    
    span {
        font-size: 0.9rem;
        font-weight: bold;
    }

    p {
        font-size: 0.85rem;
        display: inline-block;
    }
    
`;
