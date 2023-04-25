import styled, { css } from "styled-components";

export const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 0;
`;

export const SelectLabelButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  gap: 0.5rem;

  padding: 0.75rem;
  min-width: 7rem;
  font-size: 0.9rem;
  font-weight: normal;

  background-color: ${({ theme }) => theme.colors.bgComponente};
  border: none;
  border-radius: ${({ theme }) => theme.quina.media};

  color: ${({ theme }) => theme.colors.text};

  cursor: pointer;
  transition: 0.3s ease;
  &:hover {
    opacity: 0.8;
  }
`;

interface DropdownStyleProps {
  isVisible: boolean;
}

export const DropdownStyle = styled.span<DropdownStyleProps>`
  position: absolute;
  top: 2rem;
  left: 0;
  max-height: 30vmax;
  min-width: 10rem;

  margin-top: 1rem;

  padding: 0.4rem;

  border-radius: ${({ theme }) => theme.quina.media};
  background: ${({ theme }) => theme.colors.bgComponente};

  transition: max-height 0.2s ease-in-out;
  overflow: scroll;
  ${(props) =>
    props.isVisible !== true &&
    css`
      max-height: 40px;
      visibility: hidden;
    `}
`;

interface DropdownItemProps {
  active: boolean;
}

export const DropdownItem = styled.div<DropdownItemProps>`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 90%;
  margin: 0.25rem 0;
  padding: 0.5rem;
  border-radius: ${({ theme }) => theme.quina.pequena};

  font-size: 0.9rem;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.text};

  cursor: pointer;

  ${(props) =>
    props.active &&
    css`
      color: ${({ theme }) => theme.colors.primaria[700]};
      font-weight: bold;
    `}

  &:hover, :focus, :focus:hover {
    background-color: ${({ theme }) => theme.colors.primaria[700]};
    color: #fafafa;
    outline: none;
  }
`;
