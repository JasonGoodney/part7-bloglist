describe('Blog', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Elyse Willems',
      username: 'elysew',
      password: 'thebige'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Blogs')
  })

  it.only('users page can be opened', function() {
    cy.visit('http://localhost:3000/users')
    cy.contains('Users')
    cy.go('back')
    cy.contains('users').click()
    cy.contains('Users')
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
    cy.contains('Elyse Willems')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.contains('login').click()
      cy.get('.usernameInput').type('elysew')
      cy.get('.passwordInput').type('thebige')
      cy.contains('submit').click()
    })

    it('name of the user is shown', function() {
      cy.contains('Elyse Willems')
    })

    it('a new blog can be created', function() {
      cy.contains('create new').click()
      cy.get('.titleInput').type('Cypress Blog')
      cy.get('.authorInput').type('Cypress Testing')
      cy.get('.urlInput').type('cypress.io')
      cy.contains('save').click()
      cy.contains('Cypress Blog')
    })

    describe('and a blog is created', function() {
      beforeEach(function() {
        cy.contains('create new').click()
        cy.get('.titleInput').type('Another Cypress Blog')
        cy.get('.authorInput').type('Cypress Tester')
        cy.get('.urlInput').type('cypress.io')
        cy.contains('save').click()
        cy.contains('Another Cypress Blog')
      })

      it('can be selected', function() {
        cy.contains('Another Cypress Blog').click()
      })

      it('user can like blog', function() {
        // cy.wait(6000) /// Wait for notification to dismiss
        cy.get(':nth-child(3) > div > a').click()
        cy.get('.likeButton').click()
        cy.contains("you liked 'Another Cypress Blog'")
      })

      it('user can add comment', function() {
        // cy.wait(6000) /// Wait for notification to dismiss
        cy.get(':nth-child(3) > div > a').click()
        cy.get('#commentInput').type('comment by cypress')
        cy.contains('Add comment').click()
        cy.contains('comment by cypress')
      })
    })
  })
})
