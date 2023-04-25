import { InputBuscar, Input, Icon } from "./styles";
import { FiSearch } from "react-icons/fi";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import { SIZES_RAW } from "@/constants/brakingPoints";

interface ISearchBoxProps {
  placeholder: string;
}

export const SearchBox = ({ placeholder }: ISearchBoxProps) => {
  const { width } = useWindowDimensions();

  return (
    <>
      {width > SIZES_RAW.TABLET && (
        <InputBuscar>
          <Input placeholder={placeholder} />
          <Icon>{<FiSearch />}</Icon>
        </InputBuscar>
      )}
    </>
  );
};
