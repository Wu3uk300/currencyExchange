import { render, screen, fireEvent } from "@testing-library/react";
import CurrencySelect from "../components/CurrencySelect";
import { MemoryRouter } from "react-router-dom";

const mockCurrencies = {
  USD: "United States Dollar",
  EUR: "Euro",
  GBP: "British Pound",
};

describe("CurrencySelect", () => {
  it("should renders correctly", () => {
    const handleChange = jest.fn();
    render(
      <MemoryRouter>
        <CurrencySelect
          label="Currency"
          value="USD"
          onChange={handleChange}
          currencies={mockCurrencies}
        />
      </MemoryRouter>
    );

    fireEvent.mouseDown(screen.getByRole("combobox"));

    fireEvent.click(screen.getByText("Euro"));

    expect(handleChange).toHaveBeenCalled();
  });
});
