Cypress.Commands.add("preencherCadastro", (data) => {

    cy.get("#signup-firstname").type(data.firstName);
    cy.get("#signup-lastname").type(data.lastName);
    cy.get("#signup-email").type(data.email);
    cy.get("#signup-phone").type(data.phone);
    cy.get("#signup-password").type(data.password);
    cy.get("#signup-button").click();

});
