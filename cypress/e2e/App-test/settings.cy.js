describe('Settings', () => {
  it('should history be cleared', () => {
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

    cy.visit('/settings')

    cy.get('button').contains('Clear History').click()

    cy.visit('/')

    cy.get('[data-cy="history-list"]').should('be.empty')
  })

  it('select theme should change theme colors', () => {
    cy.visit('/settings')

    cy.get('[data-cy="logo"]').should('have.text', 'Calculator App')
    cy.get('[data-cy="logo"]').should('have.css', 'color', 'rgb(255, 255, 255)')
    cy.get('[data-cy="context-container"]').should(
      'have.css',
      'background-color',
      'rgb(109, 132, 177)'
    )

    cy.get('select').select('Colored Theme').should('have.value', 'colored')
    cy.get('[data-cy="logo"]').should('have.css', 'color', 'rgb(255, 255, 0)')
    cy.get('[data-cy="context-container"]').should(
      'have.css',
      'background-color',
      'rgb(223, 6, 125)'
    )

    cy.get('select').select('Dark Theme').should('have.value', 'dark')
    cy.get('[data-cy="logo"]').should('have.css', 'color', 'rgb(33, 48, 85)')
    cy.get('[data-cy="context-container"]').should(
      'have.css',
      'background-color',
      'rgb(33, 48, 85)'
    )
    cy.get('select').select('Light Theme').should('have.value', 'light')
  })
})
