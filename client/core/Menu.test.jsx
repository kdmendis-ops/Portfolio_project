// Unit test for the Menu nav bar component (client/core/Menu.jsx).
// Verifies the nav links render, and that auth-gated links (Sign up/Sign in
// vs My Profile/Sign out) toggle correctly based on session auth state.
import { describe, it, expect, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Menu from "./Menu";

afterEach(() => {
    sessionStorage.clear();
    localStorage.clear();
});

describe("Menu component", () => {
    it("renders core nav links", () => {
        render(
            <MemoryRouter>
                <Menu />
            </MemoryRouter>
        );
        expect(screen.getByText("All Shops")).toBeInTheDocument();
        expect(screen.getByText("Search")).toBeInTheDocument();
        expect(screen.getByText("Users")).toBeInTheDocument();
        expect(screen.getByText("Cart")).toBeInTheDocument();
    });

    it("shows Sign up / Sign in when the user is not authenticated", () => {
        render(
            <MemoryRouter>
                <Menu />
            </MemoryRouter>
        );
        expect(screen.getByText("Sign up")).toBeInTheDocument();
        expect(screen.getByText("Sign In")).toBeInTheDocument();
        expect(screen.queryByText("Sign out")).not.toBeInTheDocument();
    });

    it("shows My Profile / Sign out when the user is authenticated", () => {
        sessionStorage.setItem(
            "jwt",
            JSON.stringify({ token: "fake-token", user: { _id: "123", name: "Test User" } })
        );
        render(
            <MemoryRouter>
                <Menu />
            </MemoryRouter>
        );
        expect(screen.getByText("My Profile")).toBeInTheDocument();
        expect(screen.getByText("Sign out")).toBeInTheDocument();
        expect(screen.queryByText("Sign up")).not.toBeInTheDocument();
    });
});
