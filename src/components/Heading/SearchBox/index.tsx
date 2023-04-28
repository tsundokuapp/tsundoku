import { InputBusca, Input, Icon } from "./styles";
import { FiSearch } from "react-icons/fi";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import { SIZES_RAW } from "@/constants/brakingPoints";

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
  const { width } = useWindowDimensions();

  return (
    <>
      {width > SIZES_RAW.TABLET && (
        <InputBusca borda={borda} variante={variante}>
          <Input placeholder={placeholder} variante={variante} />
          <Icon>{<FiSearch />}</Icon>
        </InputBusca>
      )}
    </>
  );
};
