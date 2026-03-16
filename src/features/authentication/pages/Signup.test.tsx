
import { render, screen, fireEvent } from "@testing-library/react";
import Signup from "./Signup";
import { describe, it, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";

describe("Signup component", () => {
  it("should render all form fields, which is crucial for user registration", () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );

    expect(screen.getByRole("heading", { name: /Sign up/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText("Password", { exact: true })).toBeInTheDocument();
    expect(screen.getByLabelText(/Password Confirmation/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Sign up/i })).toBeInTheDocument();
    expect(screen.getByText(/Already have an account?/i)).toBeInTheDocument();
  });

  it("should allow users to type in the form fields, which is a critical part of the signup process", () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );

    const nameInput = screen.getByLabelText(/Name/i) as HTMLInputElement;
    const emailInput = screen.getByLabelText(/Email/i) as HTMLInputElement;
    const passwordInput = screen.getByLabelText("Password", { exact: true }) as HTMLInputElement;
    const passwordConfirmationInput = screen.getByLabelText(
      /Password Confirmation/i
    ) as HTMLInputElement;

    fireEvent.change(nameInput, { target: { value: "Test User" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.change(passwordConfirmationInput, {
      target: { value: "password" },
    });

    expect(nameInput.value).toBe("Test User");
    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password");
    expect(passwordConfirmationInput.value).toBe("password");
  });

  it("should have a link to the login page, allowing users to navigate back if they already have an account", () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );

    const loginLink = screen.getByRole("link", { name: /Log in/i });
    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute("href", "/login");
  });
});
