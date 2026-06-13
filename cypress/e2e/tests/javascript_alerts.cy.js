context('JavaScript Alerts', function () {
  beforeEach(function () {
    cy.visit('/javascript_alerts')
    cy.contains('h3', 'JavaScript Alerts').should('be.visible')
  })

  it('handles a JS alert', () => {
    const stub = cy.stub().as('alert')
    cy.on('window:alert', stub)

    cy.contains('button', 'Click for JS Alert').click()
    cy.get('@alert').should('have.been.calledWith', 'I am a JS Alert')
    cy.get('#result').should('have.text', 'You successfully clicked an alert')
  })

  it('accepts a JS confirm (OK)', () => {
    cy.on('window:confirm', () => true)

    cy.contains('button', 'Click for JS Confirm').click()
    cy.get('#result').should('have.text', 'You clicked: Ok')
  })

  it('dismisses a JS confirm (Cancel)', () => {
    // Returning false from the handler clicks "Cancel"
    cy.on('window:confirm', () => false)

    cy.contains('button', 'Click for JS Confirm').click()
    cy.get('#result').should('have.text', 'You clicked: Cancel')
  })

  it('enters text into a JS prompt', () => {
    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns('Hello Cypress')
    })

    cy.contains('button', 'Click for JS Prompt').click()
    cy.get('#result').should('have.text', 'You entered: Hello Cypress')
  })
})
