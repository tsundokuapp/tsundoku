import { render, screen } from "@testing-library/react";
import { Carousel } from ".";

import "@testing-library/jest-dom";

describe("Carousel", () => {
  it("should be render Carousel", () => {
    render(<Carousel />);

    // screen.get... retorna um erro caso não encontre o elemento
    // screen.find... retorna null caso não encontre o elemento
    expect(screen.getByAltText("Banner da obra feita pela tsundoku 0"));
  });
});
