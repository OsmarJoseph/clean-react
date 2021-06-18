import { SignupMocks } from '.'

import faker from 'faker'
import { FormHelper, RequestsHelper } from '@/tests/cypress/helpers'

const simulateValidSubmit = (actionTrigger?: 'click' | 'dbclick' | 'enter'): void => {
  cy.getByTestId('name').type(faker.internet.email())
  cy.getByTestId('email').type(faker.internet.email())
  const password = faker.random.alphaNumeric(5)
  cy.getByTestId('password').type(password)
  cy.getByTestId('passwordConfirmation').type(password)

  FormHelper.clickSubmit(actionTrigger)
}

describe('SignupPage', () => {
  beforeEach(() => {
    cy.visit('signup')
  })
  it('should load with correct initial state', () => {
    FormHelper.testInputStatus('name', 'Campo Obrigatório')
    FormHelper.testInputStatus('email', 'Campo Obrigatório')
    FormHelper.testInputStatus('password', 'Campo Obrigatório')
    FormHelper.testInputStatus('passwordConfirmation', 'Campo Obrigatório')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })
  it('should present error state if form is invalid', () => {
    cy.getByTestId('name').type(faker.random.alphaNumeric(2))
    FormHelper.testInputStatus('name', 'O campo name é invalido')

    cy.getByTestId('email').type(faker.random.word())
    FormHelper.testInputStatus('email', 'O campo email é invalido')

    cy.getByTestId('password').type(faker.random.alphaNumeric(3))
    FormHelper.testInputStatus('password', 'O campo password é invalido')

    cy.getByTestId('passwordConfirmation').type(faker.random.alphaNumeric(4))
    FormHelper.testInputStatus('passwordConfirmation', 'O campo passwordConfirmation é invalido')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })
  it('should present valid state if form is valid', () => {
    cy.getByTestId('name').type(faker.name.findName())
    FormHelper.testInputStatus('name')

    cy.getByTestId('email').type(faker.internet.email())
    FormHelper.testInputStatus('email')

    const password = faker.random.alphaNumeric(5)
    cy.getByTestId('password').type(password)
    FormHelper.testInputStatus('password')
    cy.getByTestId('passwordConfirmation').type(password)
    FormHelper.testInputStatus('passwordConfirmation')

    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })
  it('should present EmailInUseError if invalid credentials are provided', () => {
    SignupMocks.mockEmailInUseErrorRequest()
    simulateValidSubmit()

    FormHelper.testMainError('You are using an email that already exists')

    RequestsHelper.testUrl('/signup')
  })

  it('should present UnexpectedError on 400', () => {
    SignupMocks.mockUnexpectedErrorRequest()
    simulateValidSubmit()

    FormHelper.testMainError('Something wrong happened, try again.')

    RequestsHelper.testUrl('/signup')
  })
  it('should present UnexpectedError if invalid data is returned', () => {
    SignupMocks.mockInvalidDataRequest()
    simulateValidSubmit('enter')

    FormHelper.testMainError('Something wrong happened, try again.')

    RequestsHelper.testUrl('/signup')
  })
  it('should not call submit if form is invalid', () => {
    SignupMocks.mockOkRequest()
    cy.getByTestId('email').type(faker.internet.email()).type('{enter}')

    RequestsHelper.testHttpCallsCount(0)
  })
  it('should present save accessToken if valid credentials are provided', () => {
    SignupMocks.mockOkRequest()
    simulateValidSubmit()

    FormHelper.testMainError()

    RequestsHelper.testUrl('/')

    FormHelper.testLocalStorageItem('accessToken')
  })
  it('should prevent multiple submits', () => {
    SignupMocks.mockOkRequest()

    simulateValidSubmit('dbclick')

    RequestsHelper.testHttpCallsCount(1)
  })
})
