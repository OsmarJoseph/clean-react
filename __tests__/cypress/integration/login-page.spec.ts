import { LoginMocks } from '.'

import faker from 'faker'
import { FormHelper, RequestsHelper } from '@/tests/cypress/helpers'

const simulateValidSubmit = (actionTrigger?: 'click' | 'dbclick' | 'enter'): void => {
  cy.getByTestId('email').type(faker.internet.email())
  cy.getByTestId('password').type(faker.random.alphaNumeric(5))

  FormHelper.clickSubmit(actionTrigger)
}

describe('LoginPage', () => {
  beforeEach(() => {
    cy.visit('login')
  })
  it('should load with correct initial state', () => {
    FormHelper.testInputStatus('email', 'Campo Obrigatório')

    FormHelper.testInputStatus('password', 'Campo Obrigatório')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })
  it('should present error state if form is invalid', () => {
    cy.getByTestId('email').type(faker.random.word())
    FormHelper.testInputStatus('email', 'O campo email é invalido')

    cy.getByTestId('password').type(faker.random.alphaNumeric(3))
    FormHelper.testInputStatus('password', 'O campo password é invalido')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })
  it('should present valid state if form is valid', () => {
    cy.getByTestId('email').type(faker.internet.email())
    FormHelper.testInputStatus('email')

    cy.getByTestId('password').type(faker.random.alphaNumeric(5))
    FormHelper.testInputStatus('password')

    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })
  it('should present InvalidCredentialsError if invalid credentials are provided', () => {
    LoginMocks.mockInvalidCredentialsRequest()
    simulateValidSubmit()

    FormHelper.testMainError('You are using invalid credentials.')

    RequestsHelper.testUrl('/login')
  })

  it('should present UnexpectedError on 400', () => {
    LoginMocks.mockUnexpectedErrorRequest()
    simulateValidSubmit()

    FormHelper.testMainError('Something wrong happened, try again.')

    RequestsHelper.testUrl('/login')
  })
  it('should present UnexpectedError if invalid data is returned', () => {
    LoginMocks.mockInvalidDataRequest()

    simulateValidSubmit()

    FormHelper.testMainError('Something wrong happened, try again.')

    RequestsHelper.testUrl('/login')
  })
  it('should not call submit if form is invalid', () => {
    LoginMocks.mockOkRequest()
    cy.getByTestId('email').type(faker.internet.email()).type('{enter}')

    RequestsHelper.testHttpCallsCount(0)
  })
  it('should save account if valid credentials are provided', () => {
    LoginMocks.mockOkRequest()
    simulateValidSubmit()

    FormHelper.testMainError()

    RequestsHelper.testUrl('/')

    FormHelper.testLocalStorageItem('account')
  })
  it('should prevent multiple submits', () => {
    LoginMocks.mockOkRequest()

    simulateValidSubmit('dbclick')

    RequestsHelper.testHttpCallsCount(1)
  })
})
