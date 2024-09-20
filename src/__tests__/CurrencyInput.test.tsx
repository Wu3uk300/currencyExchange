import { render, screen, fireEvent } from "@testing-library/react";
import CurrencyInput from "../components/CurrencyInput";
import { MemoryRouter } from "react-router-dom";

describe("CurrencyInput", () => {
  it("should renders correctly", () => {
    const handleChange = jest.fn();
    render(
      <MemoryRouter>
        <CurrencyInput label="Amount" value="100" onChange={handleChange} />
      </MemoryRouter>
    );

    const input = screen.getByLabelText("Amount");
    fireEvent.change(input, { target: { value: "200" } });
    expect(handleChange).toHaveBeenCalled();
  });
});
