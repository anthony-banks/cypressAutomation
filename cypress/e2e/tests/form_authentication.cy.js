context('Form Authentication', function () {
  beforeEach(function () {
    // Load login credentials from the fixture and alias them
    cy.fixture('users').as('users')
  })

  it('logs in successfully with valid credentials', function () {
    // Use the custom cy.login() command with fixture-driven creds
    cy.get('@users').then((users) => {
      cy.login(users.valid.username, users.valid.password)
    })

    // Lands on the secure area
    cy.url().should('include', '/secure')
    cy.contains('h2', 'Secure Area').should('be.visible')

    // Success flash message
    cy.get('#flash')
      .should('have.class', 'success')
      .and('contain', 'You logged into a secure area!')

    // Logout link is available
    cy.get('a[href="/logout"]').should('be.visible')
  })

  it('shows an error with an invalid username', function () {
    cy.get('@users').then((users) => {
      cy.login(users.invalid.username, users.invalid.password)
    })

    // Stays on the login page and shows an error flash
    cy.url().should('include', '/login')
    cy.get('#flash')
      .should('have.class', 'error')
      .and('contain', 'Your username is invalid!')
  })
})
