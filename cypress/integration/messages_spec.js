describe('message', () => {
  it('user can send a message', () => {
    cy.visit('http://localhost:3000')
    cy.findByRole('textbox').type('Hello Botty')
    cy.findByRole('button', { name: /send/i }).click({ force: true })
    cy.get('div:contains("Hello Botty")').should('exist')
  })
})
