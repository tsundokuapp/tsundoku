import { Container, ButtonStyled } from "./styles";

interface IBotaoProps {
  label?: string;
  icon?: any;
  variant?: "primaria" | "secundario" | "icon";
  disable?: boolean;
  onClick?: () => void;
}

export const Button = ({
  label,
  icon,
  variant = "primaria",
  disable = false,
  onClick,
}: IBotaoProps) => {
  return (
    <Container>
      {variant === "icon" ? (
        <ButtonStyled variant={variant} desativado={disable} onClick={onClick}>
          {icon}
        </ButtonStyled>
      ) : (
        <ButtonStyled variant={variant} desativado={disable} onClick={onClick}>
          {icon || null}
          {label}
        </ButtonStyled>
      )}
    </Container>
  );
};
