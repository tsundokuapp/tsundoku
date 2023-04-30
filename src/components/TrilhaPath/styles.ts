import styled from "styled-components";

export const Box = styled.nav`
  color: ${({ theme }) => theme.colors.text};
  font-weight: bold;
  display: flex;
`;

interface ILinkStyled {
  isAdmin?: boolean;
}

export const LinkStyled = styled.span<ILinkStyled>`
  color: ${({ theme }) => theme.colors.text};
  font-weight: bold;
  display: inline-flex;

  font-size: ${(props) =>
    props.isAdmin ? ({ theme }) => theme.texto.nota : "none"};

  transition: 0.2s ease-in-out;

  :hover {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.primaria[700]};
  }
`;
