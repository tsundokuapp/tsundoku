import styled from "styled-components";

interface IContainer {
  retractMenuStatus: boolean;
}

export const Container = styled.div<IContainer>`
  width: ${(props) => (props.retractMenuStatus ? "5.5rem" : "12.5rem")};
  height: 100vh;
  padding-top: 3rem;
  background: ${({ theme }) => theme.colors.bgComponente};
  display: flex;
  flex-direction: column;
  border-right-style: inset;
  border-top-right-radius: ${({ theme }) => theme.quina.extraGrande};
  border-bottom-right-radius: ${({ theme }) => theme.quina.extraGrande};
  border-color: ${({ theme }) => theme.colors.primaria[500]};

  .container-avatar {
    display: flex;
    flex-direction: column;
  }
`;

export const ContainerLogo = styled.div<IContainer>`
  width: 100%;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    font-size: ${({ theme }) => theme.texto.paragrafo};
    font-weight: bold;
    margin-left: ${(props) => (props.retractMenuStatus ? "0" : "0.75rem")};
  }
`;

export const ContainerHandlleMenu = styled.div<IContainer>`
  display: flex;
  justify-content: space-between;
  margin: ${(props) =>
    props.retractMenuStatus
      ? "4.65rem 0 3.25rem .75rem"
      : "1.25rem 0 2.25rem 1.25rem"};
  cursor: pointer;

  svg {
    margin-right: 0.25rem;
  }
`;

interface IContainerMenu {
  setFooter?: boolean;
  retractMenuStatus: boolean;
}

export const ContainerMenu = styled.nav<IContainerMenu>`
  width: 100%;
  margin-top: ${(props) =>
    props.setFooter ? (props.retractMenuStatus ? "1.5rem" : "2.5rem") : 0};

  .title-menu-navigation {
    margin-left: ${(props) => (props.retractMenuStatus ? ".75rem" : "1.25rem")};
    margin-bottom: 2rem;
  }
`;

export const MenuList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
`;

export const ItemList = styled.li<IContainer>`
  :first-child {
    margin-top: 0.5rem;
  }

  :last-child {
    margin-bottom: 1.25rem;
  }

  a {
    display: flex;
    align-items: center;
    height: 2rem;

    ${(props) =>
      props.retractMenuStatus
        ? `
            width: 2.5rem;
            margin-left: 0.75rem;
            padding-left: 0.75rem;
        `
        : `
            width: 10rem;
            padding-left: 1.5rem;
            margin-left: .5rem;        
        `};
  }

  svg {
    margin-right: 0.5rem;
  }

  a:hover {
    color: ${({ theme }) => theme.colors.especial.preto};
    background-color: ${({ theme }) => theme.colors.primaria[500]};
    border-radius: ${({ theme }) => theme.quina.media};
    cursor: pointer;
  }
`;
