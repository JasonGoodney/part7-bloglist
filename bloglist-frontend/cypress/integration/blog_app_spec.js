describe('Blog', function() {
  it('front page can be opened', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Blogs')
  })

  it('login form can be opened', function() {
    cy.contains('login').click()
  })

  it('user can login', function() {
    cy.contains('login').click()
    cy.contains('Login')
    cy.get('.usernameInput').type('elysew')
    cy.get('.passwordInput').type('thebige')
    cy.contains('submit').click()
    cy.contains('elyse willems')
  })
})
