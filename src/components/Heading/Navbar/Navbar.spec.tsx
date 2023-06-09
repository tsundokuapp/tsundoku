import { fireEvent, render, screen } from "@testing-library/react";
import { Navbar } from "./";
import { CustomThemeProvider } from "@/hooks/useThemeContext";
import "@testing-library/jest-dom";

const useRouter = jest.spyOn(require("next/router"), "useRouter");
useRouter.mockImplementation(() => ({
  pathname: "/",
}));

const renderComponent = () => {
  render(
    <CustomThemeProvider>
      <Navbar />
    </CustomThemeProvider>,
  );
};

describe("Navbar", () => {
  // Teste para verificar se o componente está sendo renderizado
  it("renders Navbar correctly", () => {
    renderComponent();

    // Para usar a manipulação da Dom virtual com tobeInTheDocument é necessário importar o jest-dom
    expect(screen.getByAltText("Logo Tsundoku")).toBeInTheDocument();
  });

  // Verifica se as tabs/abas estão atualizando seu estilo
  it("updates selectedTab when a tab is clicked", () => {
    // spyOn é uma função do jest que permite espionar uma função e verificar se ela foi chamada
    // o jest está mockando a chamada da função para que ela retorne um objeto com a propriedade pathname
    jest.spyOn(require("next/router"), "useRouter").mockImplementation(() => ({
      pathname: "/",
    }));

    renderComponent();

    fireEvent.click(screen.getByText("Home"));

    expect(screen.getByText("Home")).toHaveStyle(
      "font-weight: bold; color: #259CC1",
    );
  });

  it("desactivates selectedTab when another tab is clicked", () => {
    jest.spyOn(require("next/router"), "useRouter").mockImplementation(() => ({
      pathname: "/comics",
    }));

    renderComponent();

    fireEvent.click(screen.getByText("Comics"));

    expect(screen.getByText("Novels")).not.toHaveStyle(
      "font-weight: bold; color: #259CC1",
    );
  });
});
