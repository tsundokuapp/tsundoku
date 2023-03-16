import React from 'react';
import LayoutDashBoard from 'components/LayoutDashBoard';
import Container, {Titulo} from './style';

const DashBoard: React.FC = () => {
  return (
    <LayoutDashBoard>
      <Container>
        <Titulo>Esse é o Dashboard!!!</Titulo>
      </Container>
    </LayoutDashBoard>
  );
};

export default DashBoard;
