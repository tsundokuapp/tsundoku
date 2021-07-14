import styled from "styled-components";

export const Dropdown = styled.div`
  width: 50px;
  margin-right: 20px;
  position: relative;
  user-select: none;
`;

export const DropdownBtn = styled.div`
  padding: 5px 0px 5px 4px;
  background-color: rgba(255, 255, 255, 0);
  font-weight: bold;
  color: ${(props) => props.theme.colors.branca};
  display: flex;
  align-items: center;
  cursor: pointer;  
`;

export const DropdownConteudo = styled.div`
  position: absolute;
  top: 125%;
  margin-left: -20px;
  padding: 5px 0 5px 0;
  background-color: rgba(255, 255, 255, 0);
  color: ${(props) => props.theme.colors.branca};
  width: 100px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const DropdownItem = styled.div`
  margin-left: 3px;
  padding: 5px;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: bold;
  font-size: 15px;
  width: 100px;

  > a {
    text-decoration: none;
    color: ${(props) => props.theme.colors.branca};
  }

  :hover {
    opacity: 0.7;
  }
`;
