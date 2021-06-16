import faker from 'faker'

const baseUrl: string = Cypress.config().baseUrl

describe('LoginPage', () => {
  beforeEach(() => {
    cy.visit('login')
  })
  it('should load with correct initial state', () => {
    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Campo Obrigatório')
      .should('contain.text', '🔴')
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Campo Obrigatório')
      .should('contain.text', '🔴')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })
  it('should present error state if form is invalid', () => {
    cy.getByTestId('email').type(faker.random.word())

    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'O campo email é invalido')
      .should('contain.text', '🔴')

    cy.getByTestId('password').type(faker.random.alphaNumeric(3))
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'O campo password é invalido')
      .should('contain.text', '🔴')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })
  it('should present valid state if form is valid', () => {
    cy.getByTestId('email').type(faker.internet.email())

    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Tudo certo!')
      .should('contain.text', '🟢')

    cy.getByTestId('password').type(faker.random.alphaNumeric(5))
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Tudo certo!')
      .should('contain.text', '🟢')
    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })
  it('should present InvalidCredentialsError if invalid credentials are provided', () => {
    cy.intercept('POST', '/api/login', {
      statusCode: 401,
      response: { error: faker.random.words() },
    })
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('password').type(faker.random.alphaNumeric(5))

    cy.getByTestId('submit').click()

    cy.getByTestId('spinner')
      .should('not.exist')
      .getByTestId('main-error')
      .should('contain.text', 'You are using invalid credentials.')

    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('should present UnexpectedError on 400', () => {
    cy.intercept('POST', '/api/login', {
      statusCode: 400,
      response: { error: faker.random.words() },
    })
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('password').type(faker.random.alphaNumeric(5))

    cy.getByTestId('submit').click()

    cy.getByTestId('spinner')
      .should('not.exist')
      .getByTestId('main-error')
      .should('contain.text', 'Something wrong happened, try again.')

    cy.url().should('eq', `${baseUrl}/login`)
  })
  it('should present UnexpectedError if invalid data is returned', () => {
    cy.intercept('POST', '/api/login', {
      statusCode: 400,
      body: { invalidProperty: faker.datatype.uuid() },
    })
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('password').type(faker.random.alphaNumeric(5)).type('{enter}')

    cy.getByTestId('spinner')
      .should('not.exist')
      .getByTestId('main-error')
      .should('contain.text', 'Something wrong happened, try again.')

    cy.url().should('eq', `${baseUrl}/login`)
  })
  it('should not call submit if form is invalid', () => {
    cy.intercept('POST', '/api/login', {
      statusCode: 200,
      body: { accessToken: faker.datatype.uuid() },
    }).as('request')
    cy.getByTestId('email').type(faker.internet.email()).type('{enter}')

    cy.get('@request.all').should('have.length', 0)
  })
  it('should present save accessToken if valid credentials are provided', () => {
    cy.intercept('POST', '/api/login', {
      statusCode: 200,
      body: { accessToken: faker.datatype.uuid() },
    })
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('password').type(faker.random.alphaNumeric(5))

    cy.getByTestId('submit').click()

    cy.getByTestId('main-error').should('not.exist').getByTestId('spinner').should('not.exist')

    cy.url().should('eq', `${baseUrl}/`)

    cy.window().then((window) => assert.isOk(window.localStorage.getItem('accessToken')))
  })
  it('should prevent multiple submits', () => {
    cy.intercept('POST', '/api/login', {
      statusCode: 200,
      body: { accessToken: faker.datatype.uuid() },
    }).as('request')
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('password').type(faker.random.alphaNumeric(5))

    cy.getByTestId('submit').dblclick()

    cy.get('@request.all').should('have.length', 1)
  })
})
