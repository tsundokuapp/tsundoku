import styled from 'styled-components';

export const HeaderContainer = styled.header`
  height: 5rem;
  border-bottom: 1px solid ${(props) => props.theme.textColor};
`;

export const SubContainer = styled.div`
  width: 5rem;
  height: 5rem;
  margin: 0 1rem;
  padding: 0 2rem;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderContent = styled.div`
  width: 100%;
  height: 5rem;
  margin: 0 auto;
  padding: 0 2rem;

  display: flex;
  align-items: center;
  justify-content: center;

  nav {
    margin-left: 5rem;
    height: 5rem;

    a {
      display: inline-block;
      position: relative;
      padding: 0 0.5rem;
      height: 5rem;
      line-height: 5rem;
      color: ${(props) => props.theme.textColor};
      // TODO: transição parece meio travada, verificar depois
      transition: all 0.3s ease-in-out;

      & + a {
        margin-left: 1.5rem;
      }

      &:hover {
        font-weight: bold;
        border-bottom: 3px solid ${(props) => props.theme.textColor};
      }
      // TODO: Adicionar lógica de ativado e desativado
      &.active {
        font-weight: bold;
        color: ${(props) => props.theme.aviso};
      }
    }

    a:last-child {
      margin-right: 5rem;
    }
  }
`;
