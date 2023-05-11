import styled from "styled-components";

interface IContainer {
  bg: boolean;
}

export const Container = styled.section<IContainer>`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  max-width: 55rem;
  width: 100%;

  padding: 0.75rem 0.5rem;
  background: ${(props) =>
    props.bg
      ? props.theme.colors.feedback.perigo[600]
      : props.theme.colors.primaria[500]};
  border-radius: 0.5rem;

  text-align: center;

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    h2 {
      font-weight: bold;
      margin-bottom: 0.25rem;
    }
  }

  button {
    display: flex;
    position: absolute;

    top: 0.5rem;
    right: 0.5rem;

    background: transparent;

    border: none;
    cursor: pointer;
  }
`;
