import React from 'react';
import LayoutDashBoard from '../components/LayoutDashBoard';
import Titulo from './style';

const DashBoard: React.FC = () => {
  return (
    <LayoutDashBoard>
      <Titulo>Esse é o Dashboard!!!</Titulo>
    </LayoutDashBoard>
  );
};

export default DashBoard;
