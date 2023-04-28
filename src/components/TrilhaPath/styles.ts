import styled from "styled-components";

export const Box = styled.nav`
  color: ${({ theme }) => theme.colors.text};
  font-weight: bold;
  display: flex;
`;

export const LinkStyled = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-weight: bold;
  display: inline-flex;

  transition: 0.2s ease-in-out;

  :hover {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.primaria[700]};
  }
`;
