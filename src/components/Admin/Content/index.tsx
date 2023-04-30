import React from "react";
import Container from "./styles";

interface IContent {
  children?: React.ReactNode;
}

export const Content = ({ children }: IContent) => {
  return <Container>{children}</Container>;
};
