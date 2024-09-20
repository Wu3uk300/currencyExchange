import { render, screen, fireEvent } from "@testing-library/react";
import CurrencyConverter from "../pages/CurrencyExchangePage";
import { MemoryRouter } from "react-router-dom";

describe("CurrencyConverter", () => {
  it("should renders correctly and change the amount", async () => {
    render(
      <MemoryRouter>
        <CurrencyConverter />
      </MemoryRouter>
    );

    const amountInput = await screen.findByLabelText("Amount");
    expect(amountInput).toBeInTheDocument();

    fireEvent.change(amountInput, { target: { value: "100" } });
    expect(amountInput).toHaveValue("100");
  });
});
