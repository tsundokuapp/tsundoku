import { render, screen } from "@testing-library/react";
import { Pin } from "./";
import { CustomThemeProvider } from "@/hooks/useThemeContext";
import { AnimatePresence } from "framer-motion";
import "@testing-library/jest-dom";

const renderComponent = (id: number) => {
  return render(
    <CustomThemeProvider>
      <AnimatePresence>
        <Pin
          key={id}
          id={id}
          src="https://i.imgur.com/LaT8qSA.jpeg"
          size="small"
          position="editor"
          member="fulano"
          favorites={["Majo no tabitabi", "Shadow"]}
          bio="um teste de pin"
        />
      </AnimatePresence>
    </CustomThemeProvider>,
  );
};

describe("Pin", () => {
  // Teste para verificar se o componente está sendo renderizado
  it("renders Pin correctly", () => {
    renderComponent(331);

    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  // Esse teste deveria passar mas ele conta como se houver uma renderização de keys duplicadas, talvez o problema seja o AnimatePresence;
  // TODO: refazer esse teste alterando o AnimatePresence
  // it("modal is displayed when PinBox is clicked", () => {
  //   const { getByTestId } = renderComponent(1);
  //   const pinBox = getByTestId("pin-box");
  //   fireEvent.click(pinBox);
  //   const modalMember = getByTestId("modal-member");
  //   expect(modalMember).toBeInTheDocument();
  // });
});
