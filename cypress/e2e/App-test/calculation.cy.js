describe('Calculation operations', () => {
  it('successfully loads main page', () => {
    cy.visit('/')
  })

  it('base 2 + 3 = 5', () => {
    cy.get('button').contains('2').click()
    cy.get('button').contains(/\+$/).click()
    cy.get('[data-cy="expression-result"]').should('have.text', '2+')
    cy.get('[data-cy="result"]').should('have.text', '2')
    cy.get('button').contains('3').click()
    cy.get('[data-cy="expression-result"]').should('have.text', '2+3')
    cy.get('button').contains('=').click()
    cy.get('[data-cy="expression-result"]').should('have.text', '5')
  })

  it('base 100 - 46 = 54', () => {
    cy.get('button').contains('1').click()
    cy.get('button').contains(/00/).click()
    cy.get('button').contains(/^\-$/).click()
    cy.get('button').contains('4').click()
    cy.get('button').contains('6').click()
    cy.get('[data-cy="expression-result"]').should('have.text', '100-46')
    cy.get('button').contains('=').click()
    cy.get('[data-cy="expression-result"]').should('have.text', '54')
  })

  it('base 78 / 9 = 8.667', () => {
    cy.get('button').contains('7').click()
    cy.get('button').contains('8').click()
    cy.get('button').contains(/^\/$/).click()
    cy.get('button').contains('9').click()
    cy.get('[data-cy="expression-result"]').should('have.text', '78/9')
    cy.get('button').contains('=').click()
    cy.get('[data-cy="expression-result"]').should('have.text', '8.667')
  })

  it('base 90 * .5 % 4 = 1', () => {
    cy.get('button').contains('9').click()
    cy.get('button').contains('0').click()
    cy.get('button').contains('x').click()
    cy.get('button').contains(/^\.$/).click()
    cy.get('button').contains('5').click()
    cy.get('[data-cy="expression-result"]').should('have.text', '90x.5')
    cy.get('button').contains('%').click()
    cy.get('[data-cy="result"]').should('have.text', '45')
    cy.get('button').contains('4').click()
    cy.get('button').contains('=').click()
    cy.get('[data-cy="expression-result"]').should('have.text', '1')
  })

  it('base long expr: 70 / 42 - 52 + 64 / 35 = -48.505', () => {
    cy.get('button').contains('7').click()
    cy.get('button').contains('0').click()
    cy.get('button').contains(/^\/$/).click()
    cy.get('button').contains('4').click()
    cy.get('button').contains('2').click()
    cy.get('button').contains(/^\-$/).click()
    cy.get('[data-cy="expression-result"]').should('have.text', '70/42-')
    cy.get('[data-cy="result"]').should('have.text', '1.667')
    cy.get('button').contains('5').click()
    cy.get('button').contains('2').click()
    cy.get('button').contains(/\+$/).click()
    cy.get('[data-cy="expression-result"]').should('have.text', '70/42-52+')
    cy.get('[data-cy="result"]').should('have.text', '-50.333')
    cy.get('button').contains('6').click()
    cy.get('button').contains('4').click()
    cy.get('button').contains(/^\/$/).click()
    cy.get('[data-cy="expression-result"]').should('have.text', '70/42-52+64/')
    cy.get('[data-cy="result"]').should('have.text', '13.667')
    cy.get('button').contains('3').click()
    cy.get('button').contains('5').click()
    cy.get('button').contains('=').click()
    cy.get('[data-cy="expression-result"]').should('have.text', '-48.505')
  })

  it('history list should be filled', () => {
    cy.get('[data-cy="history-list"]').should('contain', '70/42-52+64/35')
    cy.get('[data-cy="history-list"] p').should('have.length', 5)
  })

  it('base change sign to opposite and operate correct', () => {
    cy.get('button').contains('3').click().click()
    cy.get('[data-cy="expression-result"]').should('have.text', '33')
    cy.get('button')
      .contains(/^\+\/-/)
      .click()
    cy.get('[data-cy="expression-result"]').should('have.text', '-33')
    cy.get('button').contains(/\+$/).click()
    cy.get('button').contains('4').click().click()
    cy.get('button').contains('=').click()
    cy.get('[data-cy="expression-result"]').should('have.text', '11')
  })

  it('brackets: 77 + 79 / 25 * (  64 * 63 - 89 * 14  ) * 49 = 431461.240', () => {
    cy.get('button').contains('7').click().click()

    cy.get('button').contains(/\+$/).click()

    cy.get('button').contains('7').click()
    cy.get('button').contains('9').click()

    cy.get('button').contains(/^\/$/).click()

    cy.get('button').contains('2').click()
    cy.get('button').contains('5').click()

    cy.get('button').contains('x').click()

    cy.get('button').contains('(').click()

    cy.get('button').contains('6').click()
    cy.get('button').contains('4').click()

    cy.get('button').contains('x').click()

    cy.get('button').contains('6').click()
    cy.get('button').contains('3').click()

    cy.get('button').contains(/^\-$/).click()

    cy.get('button').contains('8').click()
    cy.get('button').contains('9').click()

    cy.get('button').contains('x').click()

    cy.get('button').contains('1').click()
    cy.get('button').contains('4').click()

    cy.get('button').contains(')').click()

    cy.get('button').contains('x').click()

    cy.get('button').contains('4').click()
    cy.get('button').contains('9').click()

    cy.get('[data-cy="expression-result"]').should('have.text', '77+79/25x(64x63-89x14)x49')

    cy.get('button').contains('=').click()
    cy.get('[data-cy="expression-result"]').should('have.text', '431461.24')
  })

  it('brackets nested: (81 + 60 / 54 / 21) + (77 - 31 + (41 + 69 - 62 - 96) * 0) - 0 - 62 = 65.053', () => {
    cy.get('button').contains('(').click()
    cy.get('button').contains('8').click()
    cy.get('button').contains('1').click()

    cy.get('button').contains(/\+$/).click()

    cy.get('button').contains('6').click()
    cy.get('button').contains('0').click()

    cy.get('button').contains(/^\/$/).click()

    cy.get('button').contains('5').click()
    cy.get('button').contains('4').click()

    cy.get('button').contains(/^\/$/).click()

    cy.get('button').contains('2').click()
    cy.get('button').contains('1').click()

    cy.get('button').contains(')').click()
    cy.get('button').contains(/\+$/).click()

    cy.get('button').contains('(').click()

    cy.get('button').contains('7').click().click()

    cy.get('button').contains(/^\-$/).click()

    cy.get('button').contains('3').click()
    cy.get('button').contains('1').click()

    cy.get('button').contains(/\+$/).click()

    cy.get('button').contains('(').click()

    cy.get('button').contains('4').click()
    cy.get('button').contains('1').click()

    cy.get('button').contains(/\+$/).click()

    cy.get('button').contains('6').click()
    cy.get('button').contains('9').click()

    cy.get('button').contains(/^\-$/).click()

    cy.get('button').contains('6').click()
    cy.get('button').contains('2').click()

    cy.get('button').contains(/^\-$/).click()

    cy.get('button').contains('9').click()
    cy.get('button').contains('6').click()

    cy.get('button').contains(')').click()
    cy.get('button').contains('x').click()

    cy.get('button').contains('0').click()

    cy.get('button').contains(')').click()
    cy.get('button').contains(/^\-$/).click()

    cy.get('button').contains('0').click()

    cy.get('button').contains(/^\-$/).click()

    cy.get('button').contains('6').click()
    cy.get('button').contains('2').click()

    cy.get('[data-cy="expression-result"]').should(
      'have.text',
      '(81+60/54/21)+(77-31+(41+69-62-96)x0)-0-62'
    )
    cy.get('button').contains('=').click()
    cy.get('[data-cy="expression-result"]').should('have.text', '65.053')
  })

  it('clear operator should wark', () => {
    cy.get('button').contains('9').click().click()
    cy.get('button').contains('5').click()
    cy.get('[data-cy="expression-result"]').should('have.text', '995')
    cy.get('button')
      .contains(/^\-\>$/)
      .click()
    cy.get('[data-cy="expression-result"]').should('have.text', '99')
    cy.get('button')
      .contains(/^\-\>$/)
      .click()
    cy.get('[data-cy="expression-result"]').should('have.text', '9')
    cy.get('button')
      .contains(/^\-\>$/)
      .click()
  })
  it(' AC (clear all)  operator should wark', () => {
    cy.get('button').contains('9').click()
    cy.get('button').contains('5').click()
    cy.get('button').contains('x').click()
    cy.get('button').contains('5').click()
    cy.get('[data-cy="expression-result"]').should('have.text', '95x5')
    cy.get('button').contains('AC').click()
    cy.get('[data-cy="expression-result"]').should('have.text', '0')
  })
})

describe('Calculation error display', () => {
  it('successfully loads main page', () => {
    cy.visit('/')
  })

  it('division by zero 5/0 = Division by zero!!!', () => {
    cy.get('button').contains('5').click()
    cy.get('button').contains(/^\/$/).click()
    cy.get('button').contains('0').click()
    cy.get('[data-cy="expression-result"]').should('have.text', '5/0')
    cy.get('button').contains('=').click()
    cy.get('[data-cy="expression-result"]').should('have.text', ' Division by zero!!!')
    cy.get('button').contains('AC').click()
  })

  it('brackets pairs error: Brackets must be paired!!!', () => {
    cy.get('button').contains('(').click()
    cy.get('button').contains('(').click()
    cy.get('button').contains('5').click()
    cy.get('button').contains(/^\/$/).click()
    cy.get('button').contains('=').click()
    cy.get('[data-cy="expression-result"]').should('have.text', ' Brackets must be paired!!!')
  })
})
