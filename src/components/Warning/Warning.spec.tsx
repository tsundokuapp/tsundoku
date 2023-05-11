import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";

import { CustomThemeProvider } from "@/hooks/useThemeContext";
import { Warning } from ".";

describe("Warning", () => {
  // Testa se o componente está sendo renderizado corretamente
  it("should render correctly", () => {
    const { getByText } = render(
      // O componente possui propriedade passadas pelo tema, por isso o CustomThemeProvider deve ser fornecido para que o teste não quebre
      <CustomThemeProvider>
        <Warning message="Test message" important={false} />
      </CustomThemeProvider>,
    );

    // screen.get... retorna um erro caso não encontre o elemento
    expect(getByText("AVISO")).toBeInTheDocument();
    expect(getByText("Test message")).toBeInTheDocument();
  });

  // Testa se o botão de fechar o aviso está funcionando
  it("should close warning when button is clicked", () => {
    const { getByRole, queryByText } = render(
      <CustomThemeProvider>
        <Warning message="Test message" important={false} />,
      </CustomThemeProvider>,
    );

    // getByRole pega o elemento descrito no role
    const closeButton = getByRole("button");
    fireEvent.click(closeButton);

    expect(queryByText("AVISO")).not.toBeInTheDocument();
    expect(queryByText("Test message")).not.toBeInTheDocument();
  });
});
