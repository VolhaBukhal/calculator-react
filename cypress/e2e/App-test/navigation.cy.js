// / <reference types="cypress" />

describe('The Home Page', () => {
  it('successfully loads main page', () => {
    cy.visit('/')
  })

  it('navigate to FC page and check url address', () => {
    cy.get('[data-cy="nav-item"]').contains('In Functions').click()
    cy.url().should('include', '/function-component')
  })

  it('navigate to Settings page and check url address', () => {
    cy.get('[data-cy="nav-item"]').contains('Settings').click()
    cy.url().should('include', '/settings')
  })

  it('navigate to Page not found', () => {
    cy.visit('/abrakadabra')
    cy.get('button').should('have.text', 'Back to main').click()
    cy.url().should('include', '/')
  })
})
