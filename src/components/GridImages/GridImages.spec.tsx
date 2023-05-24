import { render, screen } from "@testing-library/react";
import { GridImages } from "./";
import CustomThemeProvider from "@/hooks/useThemeContext";

const renderComponent = () => {
  return render(
    <CustomThemeProvider>
      <GridImages />
    </CustomThemeProvider>,
  );
};

describe("GridImages", () => {
  it("renders all staff images correctly", () => {
    renderComponent();

    const staffImages = screen.getAllByRole("img");
    expect(staffImages).toHaveLength(20);
  });
});
