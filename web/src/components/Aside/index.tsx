import React from "react";
import Avatar from "components/Avatar";
import Container from "components/Aside/styles";
import NavMenuAside from 'components/NavMenuAside';

interface IAside {
  className: string;
}

const Aside: React.FC<IAside> = ({ className }) => {
  return (
    <Container className={className}>
      <Avatar />
      <NavMenuAside />
    </Container>
  );
};

export default Aside;
