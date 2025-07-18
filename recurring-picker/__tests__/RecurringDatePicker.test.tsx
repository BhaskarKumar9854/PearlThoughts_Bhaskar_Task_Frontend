// __tests__/RecurringDatePicker.test.tsx
import { render, screen } from "@testing-library/react";
import RecurringDatePicker from "../src/components/RecurringDatePicker"; // ✅ Adjust this path
import "@testing-library/jest-dom";

describe("RecurringDatePicker", () => {
  it("renders correctly with initial state", () => {
    render(<RecurringDatePicker />);
    expect(screen.getByText("Recurring Date Picker")).toBeInTheDocument();
  });
});
