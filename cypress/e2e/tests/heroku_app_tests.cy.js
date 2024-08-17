context('Initial Tests', function() {
  beforeEach(function() {
    cy.fixture('auth').as('data') // Load fixture and alias it

    // Visit the heroku app the-internet homepage
    cy.visit('/')
    cy.contains('Welcome to the-internet').should('be.visible')
  })

  it('checkboxes', () => {
    // Click on the Checkboxes link
    cy.contains('Checkboxes')
      .should('be.visible')
      .click()

    // Check if the URL is correct
    cy.url().should('include', '/checkboxes')
    cy.contains('h3', 'Checkboxes').should('be.visible')

    // Check if the checkboxes are visible
    cy.contains('checkbox 1').should('be.visible')
    cy.contains('checkbox 2').should('be.visible')

    // Check if there are exactly two checkboxes
    cy.get('input[type="checkbox"]').should('have.length', 2)

    // Check if the first checkbox is checked
    cy.get('input[type="checkbox"]').eq(0).should('not.be.checked')

    // Check if the second checkbox is checked
    cy.get('input[type="checkbox"]').eq(1).should('be.checked')

    // Click on the first checkbox
    cy.get('input[type="checkbox"]').eq(0).click()

    // Check if the first checkbox is now checked
    cy.get('input[type="checkbox"]').eq(0).should('be.checked')
  })

  it('context menu', () => {
    // Click on the Context Menu link
    cy.contains('Context Menu')
      .should('be.visible')
      .click()

    // Check if the URL is correct
    cy.url().should('include', '/context_menu')
    cy.contains('h3', 'Context Menu').should('be.visible')

    // Check if the context menu is visible
    cy.get('#hot-spot').should('be.visible')
    
    // Right click on the context menu
    cy.get('#hot-spot').rightclick()

    // Verify the alert text
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('You selected a context menu')
    })
  })

  it('dropdown', () => {
    // Click on the Dropdown link
    cy.contains('Dropdown')
      .should('be.visible')
      .click()

    // Check if the URL is correct
    cy.url().should('include', '/dropdown')
    cy.contains('h3', 'Dropdown List').should('be.visible')

    // Select "Option 1" from the dropdown
    cy.get('#dropdown').should('be.visible')
    cy.get('#dropdown').select('1')

    // Verify that "Option 1" is selected
    cy.get('#dropdown').should('have.value', '1')

    // Select "Option 2" from the dropdown
    cy.get('#dropdown').select('2')

    // Verify that "Option 1" is selected
    cy.get('#dropdown').should('have.value', '2')
  })

  it('basic auth', function() {
    // Ensure Basic Auth link exists
    cy.contains('Basic Auth').should('be.visible')

    // Access the Basic Auth url and submit credentials
    cy.get('@data').then((data) => {
      cy.visit('/basic_auth', {
        auth: {
          username: data.email,
          password: data.password
        }
      })

    // Add assertions as needed
    cy.url().should('include', '/basic_auth')

    // // Check if the URL is correct
    cy.url().should('include', '/basic_auth')
    cy.contains('h3', 'Basic Auth').should('be.visible')
    })
  })
})

