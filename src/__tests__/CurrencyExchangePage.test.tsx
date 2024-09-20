import CurrencyExchangePage from "../pages/CurrencyExchangePage";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CurrencyExchange from "../components/CurrencyExchange";

describe("CurrencyExchangePage", () => {
  it("should render header with certain text", () => {
    render(
      <MemoryRouter>
        <CurrencyExchangePage />
      </MemoryRouter>
    );

    const header = screen.getByRole("heading", { level: 1 });
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent("Currency Exchange");
  });

  it("should render a Currency Exchange component", () => {
    render(
      <MemoryRouter>
        <CurrencyExchange />
      </MemoryRouter>
    );
    const component = screen.getByTestId("currency-exchange-component");
    expect(component).toBeInTheDocument();
  });
});
