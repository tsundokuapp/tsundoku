import { render, screen } from "@testing-library/react";
import { SearchBox } from ".";
import "@testing-library/jest-dom";
import CustomThemeProvider from "@/hooks/useThemeContext";

const useRouter = jest.spyOn(require("next/router"), "useRouter");
useRouter.mockImplementation(() => ({
  pathname: "/",
}));

const renderComponent = () => {
  render(
    <CustomThemeProvider>
      <SearchBox placeholder="teste 1" />
    </CustomThemeProvider>,
  );
};

describe("SearchBox", () => {
  // Teste para verificar se o componente está sendo renderizado
  it("renders SearchBox correctly", () => {
    renderComponent();

    // Para usar a manipulação da Dom virtual com tobeInTheDocument é necessário importar o jest-dom
    expect(screen.getByPlaceholderText("teste 1")).toBeInTheDocument();
  });
});
