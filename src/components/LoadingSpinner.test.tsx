import React from "react";
import { render, screen } from "@testing-library/react";
import LoadingSpinner from "@/components/LoadingSpinner";

test("renders LoadingSpinner", () => {
  render(<LoadingSpinner />);

  const spinner = screen.getByTestId("loading-spinner");
  expect(spinner).toBeInTheDocument();
});
