import styled from "styled-components";

interface INavBarProps {
  isVisible: boolean;
}

export const HeaderContainer = styled.header<INavBarProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  transition: 0.3s ease-in-out;
  min-height: 5rem;
  background: ${(props) => props.theme.colors.bgComponente};

  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);

  top: ${(props) => (props.isVisible ? 0 : 0)};
  translate: ${(props) => (props.isVisible ? "0 -5rem" : 0)};
`;

export const HeaderContent = styled.div`
  //position: relative;
  width: 100%;
  max-width: 1440px;
  height: 5rem;
  padding: 0 1rem;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Container = styled.div`
  display: flex;
  //position: relative;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.5rem;
`;

export const Nav = styled.nav`
  margin-left: 1rem;
`;

export const Ul = styled.ul`
  display: flex;
  width: 100%;
`;

export const Li = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  width: 100%;
  height: 24px;

  padding: 0.5rem;

  cursor: pointer;
  user-select: none;
  white-space: nowrap;

  a {
    display: inline-block;
    position: relative;

    padding: 0 0.5rem;
    line-height: 5rem;

    border-bottom: ${(props) => props.theme.colors.primaria[500]};
    height: calc(5rem - 1px);

    font-weight: normal;
    color: ${(props) => props.theme.colors.text};

    transition: 0.2s;

    &:hover {
      color: ${(props) => props.theme.colors.primaria[500]};
      font-weight: bold;
    }
  }
`;

export const Underline = styled.div`
  position: absolute;
  border-bottom: 3px solid ${(props) => props.theme.colors.primaria[500]};
  left: 0;
  right: 0;
  height: calc(5rem - 1px);
`;

export const SubContainer = styled.div`
  padding-left: 1rem;
  gap: 0.25rem;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
