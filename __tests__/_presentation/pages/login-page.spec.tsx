import {LoginPage} from '@/presentation/pages'
import {InvalidCredentialsError} from '@/domain/errors'

import {AuthenticationSpy} from '@/__tests__/_domain/mocks'
import {ValidationStub} from '@/__tests__/_presentation/mocks'
import {throwError} from '@/__tests__/helpers/fakes'

import React from 'react'
import {fireEvent, render, RenderResult, waitFor} from '@testing-library/react'
import 'jest-localstorage-mock'
import faker from 'faker'

type SutParams = {
  validationError: string
}

type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
}

const makeSut = (sutParams?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  validationStub.result = sutParams?.validationError
  const sut = render(
    <LoginPage validation={validationStub} authentication={authenticationSpy} />
  )
  return {
    sut,
    authenticationSpy,
  }
}

const simulateValidSubmit = (
  sut: RenderResult,
  fakeEmail = faker.internet.email(),
  fakePassword = faker.internet.password()
): void => {
  populateEmailField(sut, fakeEmail)
  populatePasswordField(sut, fakePassword)

  clickSubmit(sut)
}

const clickSubmit = (sut: RenderResult): void => {
  sut.getByTestId('submit').click()
}

const populateEmailField = (
  sut: RenderResult,
  fakeEmail = faker.internet.email()
): void => {
  const emailInput = sut.getByTestId('email')
  fireEvent.input(emailInput, {target: {value: fakeEmail}})
}

const populatePasswordField = (
  sut: RenderResult,
  fakePassword = faker.internet.password()
): void => {
  const passwordInput = sut.getByTestId('password')
  fireEvent.input(passwordInput, {target: {value: fakePassword}})
}

const validateStatusForField = (
  sut: RenderResult,
  fieldName: string,
  validationError?: string
): void => {
  const emailStatus = sut.getByTestId(`${fieldName}-status`)
  expect(emailStatus.title).toBe(validationError || 'Tudo certo!')
  expect(emailStatus.textContent).toBe(validationError ? '🔴' : '🟢')
}

describe('LoginPage', () => {
  beforeEach(() => {
    localStorage.clear()
  })
  test('should start with initial state', () => {
    const validationError = faker.random.words()
    const {sut} = makeSut({validationError})
    const errorWrap = sut.getByTestId('error-wrap')

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement

    expect(errorWrap.childElementCount).toBe(0)
    expect(submitButton.disabled).toBe(true)
    validateStatusForField(sut, 'email', validationError)
    validateStatusForField(sut, 'password', validationError)
  })

  test('should show email error if validation fails', async () => {
    const validationError = faker.random.words()
    const {sut} = makeSut({validationError})

    populateEmailField(sut)

    validateStatusForField(sut, 'email', validationError)
  })
  test('should show password error if validation fails', async () => {
    const validationError = faker.random.words()
    const {sut} = makeSut({validationError})

    populatePasswordField(sut)

    validateStatusForField(sut, 'password', validationError)
  })
  test('should show valid email state if validation succeeds', async () => {
    const {sut} = makeSut()

    populateEmailField(sut)

    validateStatusForField(sut, 'email')
  })

  test('should show valid password state if validation succeeds', async () => {
    const {sut} = makeSut()

    populatePasswordField(sut)

    validateStatusForField(sut, 'password')
  })
  test('should enable submit button if form is valid', async () => {
    const {sut} = makeSut()

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement

    populateEmailField(sut)
    populatePasswordField(sut)

    expect(submitButton.disabled).toBe(false)
  })
  test('should show loading spinner on submit', async () => {
    const {sut} = makeSut()

    simulateValidSubmit(sut)

    clickSubmit(sut)

    const spinner = sut.getByTestId('spinner')

    expect(spinner).toBeTruthy()
  })
  test('should call Authentication with correct values', async () => {
    const {sut, authenticationSpy} = makeSut()

    const fakeEmail = faker.internet.email()
    const fakePassword = faker.internet.password()

    simulateValidSubmit(sut, fakeEmail, fakePassword)

    expect(authenticationSpy.params).toEqual({
      email: fakeEmail,
      password: fakePassword,
    })
  })
  test('should call Authentication only once', async () => {
    const {sut, authenticationSpy} = makeSut()

    simulateValidSubmit(sut)
    simulateValidSubmit(sut)

    expect(authenticationSpy.callsCount).toBe(1)
  })
  test('should not call Authentication if form is invalid', async () => {
    const {sut, authenticationSpy} = makeSut({
      validationError: faker.random.words(),
    })

    populateEmailField(sut)
    fireEvent.submit(sut.getByTestId('form'))

    expect(authenticationSpy.callsCount).toBe(0)
  })
  test('should present error if authetication fails', async () => {
    const {sut, authenticationSpy} = makeSut()
    const error = new InvalidCredentialsError()

    authenticationSpy.auth = throwError(error)

    simulateValidSubmit(sut)

    const mainError = sut.getByTestId('main-error')
    const errorWrap = sut.getByTestId('error-wrap')

    expect(mainError.textContent).toBe(error.message)
    expect(errorWrap.childElementCount).toBe(1)
  })
  test('should add accessToken to local storage on success', async () => {
    const {sut, authenticationSpy} = makeSut()

    simulateValidSubmit(sut)
    await waitFor(() => sut.getByTestId('form'))
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'accessToken',
      authenticationSpy.result.accessToken
    )
  })
})
