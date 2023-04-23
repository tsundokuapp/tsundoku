import { ContainerSecao, Titulo } from "./styles";

interface ISecaoProps {
  children: React.ReactNode;
  titulo?: string;
  direcaoItens?: string;
}

export const Secao = ({
  children,
  titulo,
  direcaoItens = "column",
}: ISecaoProps) => {
  return (
    <>
      {titulo && <Titulo>{titulo}</Titulo>}
      <ContainerSecao direcaoItens={direcaoItens}>{children}</ContainerSecao>
    </>
  );
};
