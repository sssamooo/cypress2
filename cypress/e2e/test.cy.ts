describe("Home Page Albums", () => {
    it("intercepts and mocks API", () => {
        cy.intercept("GET", "/api/albums", {
            statusCode: 200,
            body: [{ id: 1, name: "Icon", author_name: "Tony Effe" }]
        }).as("getAlbums");

        cy.visit("/");

        cy.wait("@getAlbums");

        cy.contains("Icon").should("be.visible");
    });

    it("error message", () => {
        cy.intercept("GET", "/api/albums", {
            statusCode: 500,
            body: []
        }).as("getAlbums");

        cy.visit("/");
        cy.contains("Error loading albums").should("be.visible");
    });

    it("loading state", () => {
        cy.intercept("GET", "/api/albums", {
            statusCode: 200,
            body: [{ id: 1, name: "Icon", author_name: "Tony Effe" }]
        }).as("getAlbums");

        cy.visit("/");
        cy.get("p").contains("Loading...").should("be.visible");

        cy.wait("@getAlbums");
        cy.get("p").contains("Loading...").should("not.exist");
    });

    it("search", () => {
        cy.intercept("GET", "/api/search/a", {
            statusCode: 200,
            body: {
                songs: [{ id: 100, name: "Chiara", album_name: "Icon", author_name: "Tony Effe" }],
                albums: [{ id: 141, name: "Icon", author_name: "Tony Effe" }],
                authors: [{ id: 10, name: "Tony Effe" }]
            }
        }).as("getSearch");

        cy.visit("/");

        cy.get('[data-cy="search-input"]').type("a");
        cy.get('[data-cy="search-button"]').click();
        cy.wait("@getSearch");

        cy.get("[data-cy=song-item]").contains("Chiara").should("be.visible");
        cy.get("[data-cy=album-item]").contains("Icon").should("be.visible");
        cy.get("[data-cy=author-item]").contains("Tony Effe").should("be.visible");
    });
});
