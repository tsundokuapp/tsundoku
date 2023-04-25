import styled from "styled-components";
type DirectionType = "top" | "right" | "bottom" | "left";

interface ChevronProps {
  direction: DirectionType;
}

export const Chevron = styled.div<ChevronProps>`
  border-style: solid;
  border-width: 0.125rem 0.125rem 0 0;
  height: 0.5rem;
  width: 0.5rem;
  transition: all 0.25s ease-in-out;

  transform: ${(p) => p.direction === "top" && "rotate(-45deg)"};
  transform: ${(p) => p.direction === "right" && "rotate(45deg)"};
  transform: ${(p) => p.direction === "bottom" && "rotate(135deg)"};
  transform: ${(p) => p.direction === "left" && "rotate(-135deg)"};
`;

export const Container = styled.div`
  padding: 0 1.25rem;

  & + & {
    margin-top: -0.125rem;
  }
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  font-weight: bold;
  line-height: 1;

  font-size: ${({ theme }) => theme.texto.subtitulo};
  color: ${({ theme }) => theme.colors.text};
  border-bottom: 3px solid ${({ theme }) => theme.colors.primaria[500]};

  cursor: pointer;
`;

export const ContentWrapper = styled.div<{ maxHeight: number }>`
  max-height: ${(p) => `${p.maxHeight}px`};
  transition: max-height 0.25s ease-in-out;
  overflow: hidden;
`;

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  min-height: 100%;
  padding: 2rem;
  margin-left: 1rem;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  gap: 1rem;

  padding: 1rem 0;
  color: rgba(0, 0, 0, 0.75);
  line-height: 1.5;
`;

export const AccordionInfo = styled.div`
  display: flex;
  flex-direction: row;

  gap: 1.5rem;

  img {
    max-width: 300px;
    width: 100%;
    height: 450px;

    border-radius: ${({ theme }) => theme.quina.media};
  }

  p {
    color: ${({ theme }) => theme.colors.text};
    display: inline-flex;
    flex: 1;
    text-indent: 1em;
  }
`;

export const ListaCapitulos = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
`;

interface LinkPersonalizadoProps {
  urlImgCap: string;
}

export const LinkPersonalizado = styled.a<LinkPersonalizadoProps>`
  div {
    position: relative;
    padding: 0.5rem;
  }

  div::before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background-image: url(${(props) => props.urlImgCap});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    filter: brightness(0.4);
    z-index: 0;
    border-radius: ${({ theme }) => theme.quina.pequena};
  }

  p {
    position: relative;
    color: ${({ theme }) => theme.colors.especial.branco};
  }

  p:last-child {
    display: none;
  }

  :hover {
    p:first-child {
      display: none;
    }
    p:last-child {
      display: block;
    }
  }
`;
