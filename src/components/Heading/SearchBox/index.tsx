import { InputBusca, Input, Icon } from "./styles";
import { FiSearch } from "react-icons/fi";

interface ISearchBoxProps {
  placeholder: string;
  variante?: "primaria" | "secundaria";
  borda?: "redonda" | "quadrada";
}

export const SearchBox = ({
  placeholder,
  variante = "primaria",
  borda = "redonda",
}: ISearchBoxProps) => {
  return (
    <>
      <InputBusca borda={borda} variante={variante}>
        <Input placeholder={placeholder} variante={variante} />
        <Icon>{<FiSearch />}</Icon>
      </InputBusca>
    </>
  );
};
