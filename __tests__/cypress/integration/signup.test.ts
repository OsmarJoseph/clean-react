import { SignupMocks } from '.'
import { EmailInUseError, UnexpectedError } from '@/domain/errors'
import { accountKey } from '@/main/constants'

import { FormHelpers, Helpers } from '@/tests/cypress/helpers'

import faker from 'faker'

const simulateValidSubmit = (actionTrigger?: 'click' | 'dbclick' | 'enter'): void => {
  cy.getByTestId('name').type(faker.internet.email())
  cy.getByTestId('email').type(faker.internet.email())
  const password = faker.random.alphaNumeric(5)
  cy.getByTestId('password').type(password)
  cy.getByTestId('passwordConfirmation').type(password)

  FormHelpers.clickSubmit(actionTrigger)
}

describe('SignupPage', () => {
  beforeEach(() => {
    cy.visit('signup')
  })
  it('should load with correct initial state', () => {
    FormHelpers.testInputStatus('name', 'Campo Obrigatório')
    FormHelpers.testInputStatus('email', 'Campo Obrigatório')
    FormHelpers.testInputStatus('password', 'Campo Obrigatório')
    FormHelpers.testInputStatus('passwordConfirmation', 'Campo Obrigatório')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })
  it('should present error state if form is invalid', () => {
    cy.getByTestId('name').type(faker.random.alphaNumeric(2))
    FormHelpers.testInputStatus('name', 'O campo name é invalido')

    cy.getByTestId('email').type(faker.random.word())
    FormHelpers.testInputStatus('email', 'O campo email é invalido')

    cy.getByTestId('password').type(faker.random.alphaNumeric(3))
    FormHelpers.testInputStatus('password', 'O campo password é invalido')

    cy.getByTestId('passwordConfirmation').type(faker.random.alphaNumeric(4))
    FormHelpers.testInputStatus('passwordConfirmation', 'O campo passwordConfirmation é invalido')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })
  it('should present valid state if form is valid', () => {
    cy.getByTestId('name').type(faker.name.findName())
    FormHelpers.testInputStatus('name')

    cy.getByTestId('email').type(faker.internet.email())
    FormHelpers.testInputStatus('email')

    const password = faker.random.alphaNumeric(5)
    cy.getByTestId('password').type(password)
    FormHelpers.testInputStatus('password')
    cy.getByTestId('passwordConfirmation').type(password)
    FormHelpers.testInputStatus('passwordConfirmation')

    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })
  it('should present EmailInUseError if invalid credentials are provided', () => {
    SignupMocks.mockEmailInUseErrorRequest()
    simulateValidSubmit()

    FormHelpers.testMainError(EmailInUseError.message)

    Helpers.testUrl('/signup')
  })

  it('should present UnexpectedError on 400', () => {
    SignupMocks.mockUnexpectedErrorRequest()
    simulateValidSubmit()

    FormHelpers.testMainError(UnexpectedError.message)

    Helpers.testUrl('/signup')
  })
  it('should not call submit if form is invalid', () => {
    SignupMocks.mockOkRequest()
    cy.getByTestId('email').type(faker.internet.email()).type('{enter}')

    Helpers.testHttpCallsCount(0)
  })
  it('should save account if valid credentials are provided', () => {
    SignupMocks.mockOkRequest()
    simulateValidSubmit()

    FormHelpers.testMainError()

    Helpers.testUrl('/')

    Helpers.testLocalStorageItem(accountKey)
  })
  it('should prevent multiple submits', () => {
    SignupMocks.mockOkRequest()

    simulateValidSubmit('dbclick')

    Helpers.testHttpCallsCount(1)
  })
})
