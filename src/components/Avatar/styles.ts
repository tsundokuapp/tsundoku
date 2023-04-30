import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;

  span {
    font-weight: bold;
    margin-bottom: 1rem;
    color: ${(props) => props.theme.colors.primaria[500]};
  }
`;

interface IContainerImageAvatar {
  retractMenuAdmin?: boolean | undefined;
}

export const ContainerImageAvatar = styled.div<IContainerImageAvatar>`
  margin-bottom: 0.6rem;

  img {
    width: ${(props) => (props.retractMenuAdmin ? "4rem" : "6.25rem")};
    height: ${(props) => (props.retractMenuAdmin ? "4rem" : "6.25rem")};
    border: 2px solid ${(props) => props.theme.colors.primaria[500]};
    border-radius: ${({ theme }) => theme.quina.media};
  }
`;
