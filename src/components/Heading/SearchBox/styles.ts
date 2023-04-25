import styled from "styled-components";

export const InputBuscar = styled.label`
  display: flex;
  flex: 1;
  align-items: center;

  padding: 1rem;
  border-radius: ${({ theme }) => theme.quina.redonda};

  min-width: 18rem;
  max-height: 2rem;

  background: ${({ theme }) => theme.colors.especial.bgBusca};
`;

export const Input = styled.input`
  color: ${({ theme }) => theme.colors.especial.textBusca};
  background-color: transparent;
  border: none;
  font-size: ${({ theme }) => theme.texto.paragrafo};
`;

export const Icon = styled.span`
  font-size: 1rem;

  margin-left: auto;
  color: ${({ theme }) => theme.colors.especial.textBusca};

  cursor: pointer;
`;
