context('Dynamic Loading', function () {
  // The element renders ~5s after clicking Start, so allow extra time.
  const LOAD_TIMEOUT = 10000

  it('reveals a hidden element after loading (example 1)', () => {
    cy.visit('/dynamic_loading/1')
    cy.contains('h3', 'Dynamically Loaded Page Elements').should('be.visible')

    // #finish exists but is hidden until loading completes
    cy.get('#finish').should('not.be.visible')
    cy.get('#start button').click()

    cy.get('#finish', { timeout: LOAD_TIMEOUT })
      .should('be.visible')
      .find('h4')
      .should('have.text', 'Hello World!')
  })

  it('renders an element that is not initially in the DOM (example 2)', () => {
    cy.visit('/dynamic_loading/2')
    cy.contains('h3', 'Dynamically Loaded Page Elements').should('be.visible')

    // #finish is not in the DOM at all until loading completes
    cy.get('#finish').should('not.exist')
    cy.get('#start button').click()

    cy.get('#finish h4', { timeout: LOAD_TIMEOUT })
      .should('be.visible')
      .and('have.text', 'Hello World!')
  })
})
