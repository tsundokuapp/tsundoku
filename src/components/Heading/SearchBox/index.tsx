import { ContainerSearchBox, Input, Icon } from './styles';
import { Search } from '@material-ui/icons';
import { useWindowDimensions } from '@/hooks/useWindowDimensions';
import { SIZES_RAW } from '@/constants/brakingPoints';
import { useEffect, useState } from 'react';

interface ISearchBoxProps {
  placeholder: string;
}
// TODO: Implementar a lógica de busca
export const SearchBox = ({ placeholder }: ISearchBoxProps) => {
  const { width } = useWindowDimensions();
  const [mounted, setMounted] = useState(false);

  // TODO: transformar em um hook ou integrar com o useWindowDimensions
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && width > SIZES_RAW.TABLET && (
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
