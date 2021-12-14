describe('message', () => {
  it('user can send a message', () => {
    cy.visit('http://localhost:3000')
    cy.findByRole('textbox').type('Hello')
    cy.findByRole('button', { name: /send/i }).click({ force: true })
  })
})
