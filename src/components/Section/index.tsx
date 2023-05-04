import React from "react";
import { Container, Title } from "./styles";

interface ISectionProps {
  children: React.ReactNode;
  title?: string;
  directionItems?: string;
  wrapContent?: boolean;
}

export const Section = ({
  children,
  title,
  directionItems = "column",
  wrapContent = true,
}: ISectionProps) => {
  return (
    <>
      {title && <Title>{title}</Title>}
      <Container directionItems={directionItems} wrapContent={wrapContent}>
        {children}
      </Container>
    </>
  );
};
