import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'
import { accountKey } from '@/constants'

import {
  clickSubmit,
  login,
  testHttpCallsCount,
  testInputStatus,
  testLocalStorageItem,
  testMainError,
  testUrl,
} from '@/tests/cypress'

import faker from 'faker'

const simulateValidSubmit = (actionTrigger?: 'click' | 'dbclick' | 'enter'): void => {
  cy.getByTestId('email').type(faker.internet.email())
  cy.getByTestId('password').type(faker.random.alphaNumeric(5))

  clickSubmit(actionTrigger)
}

describe('LoginPage', () => {
  beforeEach(() => {
    cy.visit('login')
  })
  it('should load with correct initial state', () => {
    testInputStatus('email', 'Campo Obrigatório')

    testInputStatus('password', 'Campo Obrigatório')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })
  it('should present error state if form is invalid', () => {
    cy.getByTestId('email').type(faker.random.word())
    testInputStatus('email', 'O campo email é invalido')

    cy.getByTestId('password').type(faker.random.alphaNumeric(3))
    testInputStatus('password', 'O campo password é invalido')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })
  it('should present valid state if form is valid', () => {
    cy.getByTestId('email').type(faker.internet.email())
    testInputStatus('email')

    cy.getByTestId('password').type(faker.random.alphaNumeric(5))
    testInputStatus('password')

    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })
  it('should present InvalidCredentialsError if invalid credentials are provided', () => {
    login.mockInvalidCredentialsRequest()
    simulateValidSubmit()

    testMainError(InvalidCredentialsError.message)

    testUrl('/login')
  })

  it('should present UnexpectedError on 400', () => {
    login.mockUnexpectedErrorRequest()
    simulateValidSubmit()

    testMainError(UnexpectedError.message)

    testUrl('/login')
  })
  it('should not call submit if form is invalid', () => {
    login.mockSuccessRequest()
    cy.getByTestId('email').type(faker.internet.email()).type('{enter}')

    testHttpCallsCount(0)
  })
  it('should save account if valid credentials are provided', () => {
    login.mockSuccessRequest()
    simulateValidSubmit()

    testMainError()

    testUrl('/')

    testLocalStorageItem(accountKey)
  })
  it('should prevent multiple submits', () => {
    login.mockSuccessRequest()

    simulateValidSubmit('dbclick')

    testHttpCallsCount(1)
  })
})
