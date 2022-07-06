import React from "react";
import Avatar from "components/Avatar";
import Container from "components/Aside/styles";
import NavMenuAside from 'components/NavMenuAside';

const Aside: React.FC = () => {
  return (
    <Container>
      <Avatar />
      <NavMenuAside />
    </Container>
  );
};

export default Aside;
