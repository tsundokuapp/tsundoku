import React from "react";
import { Container, Title } from "./styles";

interface ISectionProps {
  children: React.ReactNode;
  title?: string;
  directionItems?: string;
}

export const Section = ({
  children,
  title,
  directionItems = "column",
}: ISectionProps) => {
  return (
    <>
      {title && <Title>{title}</Title>}
      <Container directionItems={directionItems}>{children}</Container>
    </>
  );
};
