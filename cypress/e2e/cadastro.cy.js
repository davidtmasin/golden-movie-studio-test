/// <reference types="cypress"/>

import { faker } from "@faker-js/faker";

describe("US-012: Cadastro de Membro", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  afterEach(() => {
    cy.screenshot();
  });

  it("Deve fazer o cadastro ao preencher os campos obrigatórios", () => {
    const data = {
      firstName: faker.person.firstName(),
      lastName: faker.person.zodiacSign(),
      email: faker.internet.exampleEmail(),
      phone: faker.number.int({ min: 1 }),
      password: "S3cr3tP@55W0rD",
    };

    cy.preencherCadastro(data);

    cy.get("#signup-response").should(
      "contain",
      "Cadastro realizado com sucesso!"
    );
  });

  it("Deve validar mensagem de erro com o campo nome inválido", () => {
    const data = {
      firstName: "123",
      lastName: faker.person.zodiacSign(),
      email: faker.internet.exampleEmail(),
      phone: faker.number.int({ min: 1 }),
      password: "S3cr3tP@55W0rD",
    };

    cy.preencherCadastro(data);

    cy.get("#signup-response").should(
      "contain",
      "Nome deve conter apenas caracteres alfabéticos, acentuados e espaços"
    );
  });

  it("Deve validar mensagem de erro com o e-mail inválido", () => {
    const data = {
      firstName: faker.person.firstName(),
      lastName: faker.person.zodiacSign(),
      email: "email",
      phone: faker.number.int({ min: 1 }),
      password: "S3cr3tP@55W0rD",
    };

    cy.preencherCadastro(data);

    cy.get("#signup-response").should(
      "contain",
      "E-mail deve ser um email válido"
    );
  });

  it("Deve validar mensagem de erro com senha fraca", () => {
    const data = {
      firstName: faker.person.firstName(),
      lastName: faker.person.zodiacSign(),
      email: faker.internet.exampleEmail(),
      phone: faker.number.int({ min: 1 }),
      password: "123",
    };

    cy.preencherCadastro(data);

    cy.get("#signup-response").should(
      "contain",
      "Senha deve ter pelo menos 8 caracteres, incluir uma letra maiúscula, um número e um caractere especial (!@#$&*)"
    );
  });

  it("Deve validar mensagem de erro com o campo sobrenome inválido", () => {
    const data = {
      firstName: faker.person.firstName(),
      lastName: "123",
      email: faker.internet.exampleEmail(),
      phone: faker.number.int({ min: 1 }),
      password: "S3cr3tP@55W0rD",
    };

    cy.preencherCadastro(data);

    cy.get("#signup-response").should(
      "contain",
      "Sobrenome deve conter apenas caracteres alfabéticos, acentuados e espaços"
    );
  });

  it("Não deve cadastrar sem preencher os campos obrigatórios", () => {
    cy.get("#signup-button").click();

    cy.get("#signup-response").should("contain", "Nome não pode estar vazio");
  });
});
