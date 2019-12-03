/// <reference types="Cypress" />

describe('Main', function() {
  it('creates a new cycle', function() {
    cy.visit('http://localhost:3000');

    const cycleName = `Test Cycle ${Date.now()} 1`;
    cy.get('#new-cycle').click();

    cy.contains('Cycle Name').type(cycleName);
    cy.contains('Daily').click();
    cy.get('#field-name-input-0').type('Test Field 1');

    cy.get('#new-field-button').click();
    cy.get('#save-cycle-button').click();

    cy.contains('validation failed').should('be.visible');

    cy.get('#field-remove-1').click();
    cy.get('#field-name-input-1').should('not.be.visible');

    cy.get('#save-cycle-button').click();

    cy.contains(cycleName).should('be.visible');
  });
});
