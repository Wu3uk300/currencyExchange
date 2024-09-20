import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HistoryPage from "../pages/HistoryPage"; // Скорректируйте путь к компоненту

describe("HistoryPage", () => {
  it("should render Header correctly", () => {
    render(
      <MemoryRouter>
        <HistoryPage />
      </MemoryRouter>
    );
    expect(screen.getByText("Conversion History")).toBeInTheDocument();
  });

  it('should renders and the "clear" button should works properly', () => {
    render(
      <MemoryRouter>
        <HistoryPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Clear History"));
    expect(localStorage.getItem("conversionHistory")).toBeNull();
  });
});
