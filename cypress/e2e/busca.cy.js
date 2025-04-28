/// <reference types="cypress"/>

describe("US-001 - Busca de Filmes", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  afterEach(() => {
    cy.screenshot();
  });

  it("Deve buscar filme com sucesso", () => {
    cy.get("#search-input").type("Matrix");
    cy.get("#search-button").click();

    cy.get("#results-section").should("be.visible");
    cy.get("#results-section").should("contain", "Matrix");
  });

  it("Deve buscar filmes com sucesso de uma lista", () => {
    cy.fixture("filmes").then((filmes) => {
      cy.get("#search-input").type(filmes[0].titulo);
      cy.get("#search-button").click();

      cy.get("#results-section").should("be.visible");
      cy.get("#results-section").should("contain", filmes[0].titulo);
    });
  });
  it("Deve buscar filmes com sucesso da lista inteira", () => {
    cy.fixture("filmes").each((filmes) => {
      cy.get("#search-input").clear().type(filmes.titulo);
      cy.get("#search-button").click();

      cy.get("#results-section").should("be.visible");
      cy.get("#results-section").should("contain", filmes.titulo);
    });
  });
});
