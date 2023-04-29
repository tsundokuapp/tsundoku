import React from "react";
import Container from "./styles";

interface IContent {
  children?: React.ReactNode;
}

const Content = ({ children }: IContent) => {
  return <Container className="content">{children}</Container>;
};

export default Content;
