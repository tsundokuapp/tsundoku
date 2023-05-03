import React from "react";
import { Container, Title } from "./styles";

interface ISectionProps {
  children: React.ReactNode;
  title?: string;
  directionItems?: string;
  wrap?: boolean;
}

export const Section = ({
  children,
  title,
  directionItems = "column",
  wrap = true,
}: ISectionProps) => {
  return (
    <>
      {title && <Title>{title}</Title>}
      <Container directionItems={directionItems} wrap={wrap}>
        {children}
      </Container>
    </>
  );
};
