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
  justify-content: center;

  img {
    height: auto;
    width: 100%;
    max-width: 400px;
    margin-top: 0.5rem;
  }

  @media (max-width: 470px) {
    img {
      max-width: 120px;
    }
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
