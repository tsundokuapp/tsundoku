import styled from "styled-components";

export const InputBuscar = styled.label`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;

  padding: 0.5rem;
  border-radius: ${({ theme }) => theme.quina.redonda};

  min-width: 18rem;
  max-height: 2rem;

  background: ${({ theme }) => theme.colors.especial.bgBusca};
`;

export const Input = styled.input`
  color: ${({ theme }) => theme.colors.especial.textBusca};
  background-color: transparent;
  border: none;
  padding-left: 0.5rem;
  font-size: ${({ theme }) => theme.texto.paragrafo};
`;

export const Icon = styled.div`
  display: flex;
  font-size: 1rem;
  margin: 0 0.25rem;
  color: ${({ theme }) => theme.colors.especial.textBusca};

  cursor: pointer;
  transition: opacity 0.3s;
`;
