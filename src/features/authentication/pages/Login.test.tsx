
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "./Login";
import { describe, it, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

describe("Login component", () => {
  it("should render all form fields, which is crucial for user interaction", () => {
    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Login />
        </QueryClientProvider>
      </BrowserRouter>
    );

    expect(screen.getByRole("heading", { name: /Sign in/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument();
    expect(screen.getByText(/Forget Password?/i)).toBeInTheDocument();
    expect(screen.getByText(/Don\'t have an account?/i)).toBeInTheDocument();
  });

  it("should allow users to type in the form fields, which is a critical part of the login process", () => {
    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Login />
        </QueryClientProvider>
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText(/Email/i) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(/Password/i) as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });

    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password");
  });
});
