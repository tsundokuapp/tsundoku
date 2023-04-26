import { Container, ButtonStyled } from "./styles";

interface IBotaoProps {
  titulo: string;
  icone?: any;
  variante?: "primaria" | "secundario" | "icone";
  desativado?: boolean;
}

export const Button = ({
  titulo,
  icone,
  variante = "primaria",
  desativado = false,
}: IBotaoProps) => {
  return (
    <Container>
      {variante === "icone" ? (
        <ButtonStyled variante={variante} desativado={desativado}>
          {icone}
        </ButtonStyled>
      ) : (
        <ButtonStyled variante={variante} desativado={desativado}>
          {icone || null}
          {titulo}
        </ButtonStyled>
      )}
    </Container>
  );
};
