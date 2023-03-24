import React from "react";
import Avatar from "../../Avatar";
import Container from "./styles";
import NavMenuAside from '../NavMenuAside';

interface IAside {
  className: string;
}

const Aside = ({ className } : IAside) => {
  return (
    <Container className={className}>
      <Avatar />
      <NavMenuAside />
    </Container>
  );
};

export default Aside;
