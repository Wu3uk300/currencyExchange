import { render, screen } from "@testing-library/react";
import Header from "../components/Header";
import { MemoryRouter } from "react-router-dom";

describe("Header", () => {
  it("should renders correct values for 'from' input", () => {
    render(
      <MemoryRouter>
        <Header
          fromAmount={100}
          toAmount={120}
          fromCurrency="USD"
          toCurrency="EUR"
          amountInput="from"
        />
      </MemoryRouter>
    );

    expect(screen.getByText("100.00 USD is")).toBeInTheDocument();
    expect(screen.getByText("120.00 EUR")).toBeInTheDocument();
  });

  it("should renders correct values for 'to' input", () => {
    render(
      <MemoryRouter>
        <Header
          fromAmount={100}
          toAmount={120}
          fromCurrency="USD"
          toCurrency="EUR"
          amountInput="to"
        />
      </MemoryRouter>
    );

    expect(screen.getByText("120.00 EUR is")).toBeInTheDocument();
    expect(screen.getByText("100.00 USD")).toBeInTheDocument();
  });

  it("should renders '0.00' if fromAmount is NaN for 'from' input", () => {
    render(
      <MemoryRouter>
        <Header
          fromAmount={NaN}
          toAmount={120}
          fromCurrency="USD"
          toCurrency="EUR"
          amountInput="from"
        />
      </MemoryRouter>
    );

    expect(screen.getByText("0.00 USD is")).toBeInTheDocument();
    expect(screen.getByText("120.00 EUR")).toBeInTheDocument();
  });

  it("should renders '0.00' if toAmount is NaN for 'to' input", () => {
    render(
      <MemoryRouter>
        <Header
          fromAmount={100}
          toAmount={NaN}
          fromCurrency="USD"
          toCurrency="EUR"
          amountInput="to"
        />
      </MemoryRouter>
    );

    expect(screen.getByText("0.00 EUR is")).toBeInTheDocument();
    expect(screen.getByText("100.00 USD")).toBeInTheDocument();
  });
});
