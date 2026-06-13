context('Status Codes', function () {
  const codes = [200, 301, 404, 500]

  beforeEach(function () {
    cy.visit('/status_codes')
    cy.contains('h3', 'Status Codes').should('be.visible')
  })

  it('shows links for each status code', () => {
    codes.forEach((code) => {
      cy.get(`a[href="status_codes/${code}"]`).should('have.text', String(code))
    })
  })

  it('navigates to each status-code page and shows the right message', () => {
    codes.forEach((code) => {
      cy.get(`a[href="status_codes/${code}"]`).click()
      cy.url().should('include', `/status_codes/${code}`)
      cy.contains(`This page returned a ${code} status code.`).should('be.visible')
      cy.go('back')
    })
  })

  it('returns the correct HTTP status for each endpoint', () => {
    codes.forEach((code) => {
      cy.request({ url: `/status_codes/${code}`, failOnStatusCode: false, followRedirect: false })
        .its('status')
        .should('eq', code)
    })
  })
})
