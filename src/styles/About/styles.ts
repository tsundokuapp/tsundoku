import styled from "styled-components";

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h2 {
    align-self: center;
    margin-top: 1rem;

    :first-child {
      margin-top: 0;
    }
  }

  p {
    text-align: justify;
    margin-top: 1rem;

    :first-child {
      margin-top: 0;
    }
  }
`;

export const Logos = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%;

  img {
    width: 100%;
    max-width: 300px;
    height: auto;
  }
`;

export const Team = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;

  h2 {
    text-align: center;
    margin: 1rem;
  }
`;
