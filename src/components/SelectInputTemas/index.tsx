import React from "react";
import { Container } from "./style";

import iconDark from "../../assets/img/IconDark.svg";
import iconLight from "../../assets/img/IconLight.svg";
import iconSepia from "../../assets/img/IconSepia.svg";

interface ISelectInputTemasProps {
  options: {
    value: string;
    label: string;
  }[];
  onChange(event: React.ChangeEvent<HTMLSelectElement>): void | undefined;
}

const SelectInputTemas: React.FC<ISelectInputTemasProps> = ({
  options,
  onChange,
}) => {
  return (
    <Container>
      <select onChange={onChange}>
        {
            options.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))
        }
      </select>
    </Container>
  );
};

export default SelectInputTemas;
