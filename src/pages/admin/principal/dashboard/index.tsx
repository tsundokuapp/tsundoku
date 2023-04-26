import React from 'react';
import LayoutAdminMain from '../../../../components/Layouts/Admin/Main';
import Container, {Titulo} from './style';

const DashBoard = () => {
  return (
    <LayoutAdminMain>
      <Container>
        <Titulo>Esse é o Dashboard!!!</Titulo>
      </Container>
    </LayoutAdminMain>
  );
};

export default DashBoard;
