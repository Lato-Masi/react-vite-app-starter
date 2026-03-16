
import { render, screen } from "@testing-library/react";
import Welcome from "./Welcome";
import { describe, it, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";

describe("Welcome component", () => {
  it("should render the Welcome heading, which signifies that the component is loading correctly", () => {
    render(
      <BrowserRouter>
        <Welcome />
      </BrowserRouter>
    );
    const welcomeHeading = screen.getByRole("heading", { name: /Welcome/i });
    expect(welcomeHeading).toBeInTheDocument();
  });
});
