import { ContainerSearchBox, Input, Icon } from './styles';

interface ISearchBoxProps {
  placeholder: string;
}
// TODO: Implementar a lógica de busca
// TODO: adicionar o ícone de busca
export const SearchBox = ({ placeholder }: ISearchBoxProps) => {
  return (
    <ContainerSearchBox>
      <Input placeholder={placeholder} />
      <Icon>a</Icon>
    </ContainerSearchBox>
  );
};
