import { ContainerBotao, Botao } from "./styles";

interface IBotaoProps {
  titulo: string;
  icone?: any;
  variante?: "primaria" | "secundario" | "icone";
  desativado?: boolean;
}

export const TsunBotao = ({
  titulo,
  icone,
  variante = "primaria",
  desativado = false,
}: IBotaoProps) => {
  return (
    <ContainerBotao>
      {variante === "icone" ? (
        <Botao variante={variante} desativado={desativado}>
          {icone}
        </Botao>
      ) : (
        <Botao variante={variante} desativado={desativado}>
          {icone || null}
          {titulo}
        </Botao>
      )}
    </ContainerBotao>
  );
};
