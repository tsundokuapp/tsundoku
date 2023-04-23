import styled from "styled-components";

interface ILinkTextProps {
  pathName: string;
  href: string;
}

interface INavBarProps {
  isVisible: boolean;
}

export const HeaderContainer = styled.header<INavBarProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: 0.3s ease-in-out;
  height: 5rem;
  background: ${(props) => props.theme.colors.bgComponente};

  border-bottom: 1px solid ${(props) => props.theme.colors.primaria[500]};
  top: ${(props) => (props.isVisible ? 0 : 0)};
  translate: ${(props) => (props.isVisible ? "0 -5rem" : 0)};
`;

export const SubContainer = styled.div`
  width: 5rem;
  height: 5rem;
  padding: 0 2rem;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Container = styled.div`
  margin: 0 1rem;
  padding: 0 0.5rem;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderContent = styled.div`
  width: 100%;
  max-width: 1440px;
  height: 5rem;
  margin: 0 auto;
  padding: 0 2rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  nav {
    margin-left: 2rem;
    height: 5rem;

    a {
      display: inline-block;
      position: relative;
      padding: 0 0.5rem;
      line-height: 5rem;
      & + a {
        margin-left: 1rem;
      }
    }

    /* a:last-child {
      margin-right: 5rem;
    } */
  }
`;

export const LinkText = styled.p<ILinkTextProps>`
  border-bottom: ${(props) =>
    props.href === props.pathName
      ? `3px solid ${props.theme.colors.primaria[500]}`
      : "none"};
  height: calc(5rem - 1px);

  font-weight: ${(props) =>
    props.href === props.pathName ? "bold" : "normal"};
  color: ${(props) =>
    props.href === props.pathName
      ? props.theme.colors.primaria[500]
      : props.theme.colors.text};

  transition: all 0.3s ease-in-out;

  &:hover {
    font-weight: bold;
    border-bottom: 3px solid ${(props) => props.theme.colors.text};
  }
`;
