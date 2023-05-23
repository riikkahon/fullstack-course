describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    cy.visit('')

    const user = {
      username: 'riikkahoo',
      password: 'salasana',
      name: 'Riikka'

    }

    const user2 = {
      username: 'riihon',
      password: 'salasana2',
      name: 'Muu Riikka'
    }

    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user2)

  })

  it('Login page is shown', function() {

    cy.contains('Blogs')
    cy.contains('Log in to application')
  })

  it('Login form is shown', function() {

    cy.contains('log in').click()
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('log in').click()
      cy.get('input:first').type('riikkahoo')
      cy.get('input:last').type('salasana')
      cy.contains('login').click()
      cy.contains('Riikka logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('log in').click()
      cy.get('input:first').type('riikkahoo')
      cy.get('input:last').type('sasana')
      cy.contains('login').click()
      cy.contains('wrong credentials')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'riikkahoo', password: 'salasana' })
    })

    it('A blog can be created', function() {
      cy.createBlog({
        title: 'Title this is',
        author: 'Me',
        url: 'blogit.fi'
      })
      cy.contains('Title this is')
    })

    it('A blog can be liked', function() {
      cy.createBlog({
        title: 'Title this is',
        author: 'Me',
        url: 'blogit.fi'
      })
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('1')
    })

    it('A blog can be removed', function() {
      cy.createBlog({
        title: 'Title this is',
        author: 'Me',
        url: 'blogit.fi'
      })
      cy.contains('view').click()
      cy.contains('remove').click()
      cy.contains('was deleted')
    })

    it('Only logged in user can see remove -button', function() {
      cy.contains('logout').click()
      cy.contains('log in').click()
      cy.get('#username').type('riihon')
      cy.get('#password').type('salasana2')
      cy.get('#login-button').click()
      cy.get('#create-new').click()
      cy.get('#title').type('riikkahoo cannot remove this')
      cy.get('#author').type('Someone')
      cy.get('#url').type('blogit.fi')
      cy.get('#create-button').click()
      cy.contains('logout').click()
      cy.login({ username: 'riikkahoo', password: 'salasana' })
      cy.contains('view').click()
      cy.should('not.contain', 'remove')
    })

    it('Show blogs in likes -order', function() {
      cy.createBlog({
        title: 'First',
        author: 'Me',
        url: 'blogit.fi'
      })

      cy.createBlog({
        title: 'Second',
        author: 'Me',
        url: 'blogit.fi'
      })

      cy.get('#Second-view').click()
      cy.get('#Second-like').click()
      cy.contains('logout').click()
      cy.login({ username: 'riikkahoo', password: 'salasana' })
      cy.get('.blog').eq(0).should('contain', 'Second')

    })

  })

})