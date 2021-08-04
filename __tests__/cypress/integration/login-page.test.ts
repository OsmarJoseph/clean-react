import { LoginMocks } from '.'
import { accountKey } from '@/main/constants'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'

import { FormHelpers, Helpers } from '@/tests/cypress/helpers'

import faker from 'faker'

const simulateValidSubmit = (actionTrigger?: 'click' | 'dbclick' | 'enter'): void => {
  cy.getByTestId('email').type(faker.internet.email())
  cy.getByTestId('password').type(faker.random.alphaNumeric(5))

  FormHelpers.clickSubmit(actionTrigger)
}

describe('LoginPage', () => {
  beforeEach(() => {
    cy.visit('login')
  })
  it('should load with correct initial state', () => {
    FormHelpers.testInputStatus('email', 'Campo Obrigatório')

    FormHelpers.testInputStatus('password', 'Campo Obrigatório')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })
  it('should present error state if form is invalid', () => {
    cy.getByTestId('email').type(faker.random.word())
    FormHelpers.testInputStatus('email', 'O campo email é invalido')

    cy.getByTestId('password').type(faker.random.alphaNumeric(3))
    FormHelpers.testInputStatus('password', 'O campo password é invalido')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })
  it('should present valid state if form is valid', () => {
    cy.getByTestId('email').type(faker.internet.email())
    FormHelpers.testInputStatus('email')

    cy.getByTestId('password').type(faker.random.alphaNumeric(5))
    FormHelpers.testInputStatus('password')

    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })
  it('should present InvalidCredentialsError if invalid credentials are provided', () => {
    LoginMocks.mockInvalidCredentialsRequest()
    simulateValidSubmit()

    FormHelpers.testMainError(InvalidCredentialsError.message)

    Helpers.testUrl('/login')
  })

  it('should present UnexpectedError on 400', () => {
    LoginMocks.mockUnexpectedErrorRequest()
    simulateValidSubmit()

    FormHelpers.testMainError(UnexpectedError.message)

    Helpers.testUrl('/login')
  })
  it('should not call submit if form is invalid', () => {
    LoginMocks.mockOkRequest()
    cy.getByTestId('email').type(faker.internet.email()).type('{enter}')

    Helpers.testHttpCallsCount(0)
  })
  it('should save account if valid credentials are provided', () => {
    LoginMocks.mockOkRequest()
    simulateValidSubmit()

    FormHelpers.testMainError()

    Helpers.testUrl('/')

    Helpers.testLocalStorageItem(accountKey)
  })
  it('should prevent multiple submits', () => {
    LoginMocks.mockOkRequest()

    simulateValidSubmit('dbclick')

    Helpers.testHttpCallsCount(1)
  })
})
