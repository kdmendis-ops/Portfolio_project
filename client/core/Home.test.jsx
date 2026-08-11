// Unit test for the Home page component (client/core/Home.jsx).
// Verifies the page renders its title and welcome copy.
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./Home";

describe("Home component", () => {
    it("renders the Home Page title", () => {
        render(<Home />);
        expect(screen.getByText("Home Page")).toBeInTheDocument();
    });

    it("renders the welcome message", () => {
        render(<Home />);
        expect(
            screen.getByText("Welcome to the MERN Skeleton home page.")
        ).toBeInTheDocument();
    });

    it("renders the hero image with correct alt/title", () => {
        render(<Home />);
        expect(screen.getByTitle("Unicorn Bike")).toBeInTheDocument();
    });
});
