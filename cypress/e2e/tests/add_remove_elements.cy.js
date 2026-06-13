context('Add / Remove Elements', function () {
  beforeEach(function () {
    cy.visit('/add_remove_elements/')
    cy.contains('h3', 'Add/Remove Elements').should('be.visible')
  })

  it('adds delete buttons when "Add Element" is clicked', () => {
    // No delete buttons to start
    cy.get('#elements button.added-manually').should('have.length', 0)

    // Add three elements
    cy.contains('button', 'Add Element').click().click().click()

    // Three "Delete" buttons are now present
    cy.get('#elements button.added-manually')
      .should('have.length', 3)
      .each(($btn) => {
        cy.wrap($btn).should('have.text', 'Delete')
      })
  })

  it('removes a delete button when it is clicked', () => {
    cy.contains('button', 'Add Element').click().click()
    cy.get('#elements button.added-manually').should('have.length', 2)

    // Remove one
    cy.get('#elements button.added-manually').first().click()
    cy.get('#elements button.added-manually').should('have.length', 1)
  })
})
