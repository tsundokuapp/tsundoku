import React from "react";
import Container from "components/Content/styles";

const Content: React.FC = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Content;
