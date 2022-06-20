describe('Local Storage Settings should be implemented after reload', () => {
  it('theme should be set from LS', () => {
    cy.visit('/settings')

    cy.get('select').select('Colored Theme')
    cy.reload()

    cy.get('select').should('have.value', 'colored')
  })

  it('history should be set from LS', () => {
    cy.visit('/')

    cy.get('button').contains('2').click()
    cy.get('button').contains(/\+$/).click()
    cy.get('button').contains('3').click()
    cy.get('button').contains('=').click()
    cy.get('[data-cy="history-list"]').should('contain', '2+3')

    cy.get('button').contains('1').click()
    cy.get('button').contains(/00/).click()
    cy.get('button').contains(/^\-$/).click()
    cy.get('button').contains('4').click()
    cy.get('button').contains('6').click()
    cy.get('button').contains('=').click()
    cy.get('[data-cy="history-list"]').should('contain', '100-46')
    cy.get('[data-cy="history-list"] p').should('have.length', 2)

    cy.reload()

    cy.get('[data-cy="history-list"] p').should('have.length', 2)
  })
})
