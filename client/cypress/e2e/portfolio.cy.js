// E2E test suite for the Portfolio App.
// Run the dev server first (npm run dev, from the client folder), then:
//   npx cypress open   -> interactive/recorded run
//   npx cypress run    -> headless run (saves a video under cypress/videos)
describe("Portfolio App - core navigation", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("loads the Home page with the nav bar and hero content", () => {
        cy.contains("MERN Skeleton").should("be.visible");
        cy.contains("Home Page").should("be.visible");
        cy.contains("Welcome to the MERN Skeleton home page.").should("be.visible");
    });

    it("navigates to All Shops from the nav bar", () => {
        cy.contains("All Shops").click();
        cy.url().should("include", "/shops/all");
    });

    it("navigates to the Search page from the nav bar", () => {
        cy.contains("Search").click();
        cy.url().should("include", "/search");
    });

    it("navigates to the Users page from the nav bar", () => {
        cy.contains("Users").click();
        cy.url().should("include", "/users");
    });

    it("navigates to Sign up from the nav bar", () => {
        cy.contains("Sign up").click();
        cy.url().should("include", "/signup");
    });

    it("navigates to Sign in and shows the sign-in form", () => {
        cy.contains("Sign In").click();
        cy.url().should("include", "/signin");
        cy.get("#email").should("exist");
        cy.get("#password").should("exist");
    });

    it("redirects to Sign in when visiting a private route while logged out", () => {
        cy.visit("/seller/shops");
        cy.url().should("include", "/signin");
    });
});
