import { ContainerSearchBox, Input, Icon } from './styles';
import { Search } from '@material-ui/icons';
import { useWindowDimensions } from '@/hooks/useWindowDimensions';
import { SIZES_RAW } from '@/constants/brakingPoints';

interface ISearchBoxProps {
  placeholder: string;
}
// TODO: Implementar a lógica de busca
export const SearchBox = ({ placeholder }: ISearchBoxProps) => {
  const { width } = useWindowDimensions();

  return (
    <>
      {width > SIZES_RAW.TABLET && (
        <ContainerSearchBox>
          <>
            <Input placeholder={placeholder} />
            <Icon>{<Search />}</Icon>
          </>
        </ContainerSearchBox>
      )}
    </>
  );
};
