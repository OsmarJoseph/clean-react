import { EmailInUseError, UnexpectedError } from '@/domain/errors'
import { accountKey } from '@/constants'

import {
  signUp,
  clickSubmit,
  testHttpCallsCount,
  testInputStatus,
  testLocalStorageItem,
  testMainError,
  testUrl,
} from '@/tests/cypress'

import faker from 'faker'

const simulateValidSubmit = (actionTrigger?: 'click' | 'dbclick' | 'enter'): void => {
  cy.getByTestId('name').type(faker.internet.email())
  cy.getByTestId('email').type(faker.internet.email())
  const password = faker.random.alphaNumeric(5)
  cy.getByTestId('password').type(password)
  cy.getByTestId('passwordConfirmation').type(password)

  clickSubmit(actionTrigger)
}

describe('SignupPage', () => {
  beforeEach(() => {
    cy.visit('signup')
  })
  it('should load with correct initial state', () => {
    testInputStatus('name', 'Campo Obrigatório')
    testInputStatus('email', 'Campo Obrigatório')
    testInputStatus('password', 'Campo Obrigatório')
    testInputStatus('passwordConfirmation', 'Campo Obrigatório')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })
  it('should present error state if form is invalid', () => {
    cy.getByTestId('name').type(faker.random.alphaNumeric(2))
    testInputStatus('name', 'O campo name é invalido')

    cy.getByTestId('email').type(faker.random.word())
    testInputStatus('email', 'O campo email é invalido')

    cy.getByTestId('password').type(faker.random.alphaNumeric(3))
    testInputStatus('password', 'O campo password é invalido')

    cy.getByTestId('passwordConfirmation').type(faker.random.alphaNumeric(4))
    testInputStatus('passwordConfirmation', 'O campo passwordConfirmation é invalido')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })
  it('should present valid state if form is valid', () => {
    cy.getByTestId('name').type(faker.name.findName())
    testInputStatus('name')

    cy.getByTestId('email').type(faker.internet.email())
    testInputStatus('email')

    const password = faker.random.alphaNumeric(5)
    cy.getByTestId('password').type(password)
    testInputStatus('password')
    cy.getByTestId('passwordConfirmation').type(password)
    testInputStatus('passwordConfirmation')

    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })
  it('should present EmailInUseError if invalid credentials are provided', () => {
    signUp.mockEmailInUseErrorRequest()
    simulateValidSubmit()

    testMainError(EmailInUseError.message)

    testUrl('/signup')
  })

  it('should present UnexpectedError on 400', () => {
    signUp.mockUnexpectedErrorRequest()
    simulateValidSubmit()

    testMainError(UnexpectedError.message)

    testUrl('/signup')
  })
  it('should not call submit if form is invalid', () => {
    signUp.mockSuccessRequest()
    cy.getByTestId('email').type(faker.internet.email()).type('{enter}')

    testHttpCallsCount(0)
  })
  it('should save account if valid credentials are provided', () => {
    signUp.mockSuccessRequest()
    simulateValidSubmit()

    testMainError()

    testUrl('/')

    testLocalStorageItem(accountKey)
  })
  it('should prevent multiple submits', () => {
    signUp.mockSuccessRequest()

    simulateValidSubmit('dbclick')

    testHttpCallsCount(1)
  })
})
