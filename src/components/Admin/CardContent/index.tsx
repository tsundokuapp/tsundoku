import React from "react";
import { Container, ContainerContent } from "./styles";

interface ICardContent {
  width: string;
  height: string;
  children?: React.ReactNode;
  title: string;
}

export const CardContent = ({
  children,
  width,
  height,
  title,
}: ICardContent) => {
  return (
    <Container width={width} height={height}>
      <>
        <h2>{title}</h2>
        <ContainerContent>{children}</ContainerContent>
      </>
    </Container>
  );
};
