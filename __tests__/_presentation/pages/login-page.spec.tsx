import { LoginPage } from '@/presentation/pages'
import { InvalidCredentialsError } from '@/domain/errors'

import { AuthenticationSpy, SaveAccessTokenMock } from '@/tests/_domain/mocks'
import { ValidationStub } from '@/tests/_presentation/mocks'
import { throwError } from '@/tests/helpers/fakes'

import React from 'react'
import { createMemoryHistory } from 'history'
import { fireEvent, render, RenderResult, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import faker from 'faker'
import { Router } from 'react-router-dom'

type SutParams = {
  validationError: string
}

type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
  saveAccessTokenMock: SaveAccessTokenMock
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSut = (sutParams?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  const saveAccessTokenMock = new SaveAccessTokenMock()
  validationStub.result = sutParams?.validationError
  const sut = render(
    <Router history={history}>
      <LoginPage
        validation={validationStub}
        saveAccessToken={saveAccessTokenMock}
        authentication={authenticationSpy}
      />
    </Router>,
  )
  return {
    sut,
    authenticationSpy,
    saveAccessTokenMock,
  }
}

const simulateValidSubmit = (
  sut: RenderResult,
  fakeEmail = faker.internet.email(),
  fakePassword = faker.internet.password(),
): void => {
  populateEmailField(sut, fakeEmail)
  populatePasswordField(sut, fakePassword)

  clickSubmit(sut)
}

const clickSubmit = (sut: RenderResult): void => {
  userEvent.click(sut.getByTestId('submit'))
}

const populateEmailField = (sut: RenderResult, fakeEmail = faker.internet.email()): void => {
  const emailInput = sut.getByTestId('email')
  userEvent.clear(emailInput)
  userEvent.type(emailInput, fakeEmail)
}

const populatePasswordField = (
  sut: RenderResult,
  fakePassword = faker.internet.password(),
): void => {
  const passwordInput = sut.getByTestId('password')
  userEvent.clear(passwordInput)
  userEvent.type(passwordInput, fakePassword)
}

const validateStatusForField = (
  sut: RenderResult,
  fieldName: string,
  validationError?: string,
): void => {
  const emailStatus = sut.getByTestId(`${fieldName}-status`)
  expect(emailStatus).toHaveAttribute('title', validationError || 'Tudo certo!')
  expect(emailStatus).toHaveTextContent(validationError ? '🔴' : '🟢')
}

const testErrorWrapChildCount = (sut: RenderResult, count: number): void => {
  const errorWrap = sut.getByTestId('error-wrap')
  expect(errorWrap.childElementCount).toBe(count)
}

const testElementExists = (sut: RenderResult, testId: string): void => {
  const element = sut.getByTestId(testId)
  expect(element).toBeInTheDocument()
}

const testElementText = (sut: RenderResult, testId: string, text: string): void => {
  const element = sut.getByTestId(testId)
  expect(element).toHaveTextContent(text)
}

const testButtonIsDisabled = (sut: RenderResult, testId: string, isDisabled: boolean): void => {
  const button = sut.getByTestId(testId) as HTMLButtonElement
  if (isDisabled) {
    expect(button).toBeDisabled()
  } else {
    expect(button).not.toBeDisabled()
  }
}

describe('LoginPage', () => {
  test('should start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })

    testButtonIsDisabled(sut, 'submit', true)

    testErrorWrapChildCount(sut, 0)
    validateStatusForField(sut, 'email', validationError)
    validateStatusForField(sut, 'password', validationError)
  })

  test('should show email error if validation fails', async () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })

    populateEmailField(sut)

    validateStatusForField(sut, 'email', validationError)
  })
  test('should show password error if validation fails', async () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })

    populatePasswordField(sut)

    validateStatusForField(sut, 'password', validationError)
  })
  test('should show valid email state if validation succeeds', async () => {
    const { sut } = makeSut()

    populateEmailField(sut)

    validateStatusForField(sut, 'email')
  })

  test('should show valid password state if validation succeeds', async () => {
    const { sut } = makeSut()

    populatePasswordField(sut)

    validateStatusForField(sut, 'password')
  })
  test('should enable submit button if form is valid', async () => {
    const { sut } = makeSut()

    populateEmailField(sut)
    populatePasswordField(sut)

    testButtonIsDisabled(sut, 'submit', false)
  })
  test('should show loading spinner on submit', async () => {
    const { sut } = makeSut()

    simulateValidSubmit(sut)

    testElementExists(sut, 'spinner')
  })
  test('should call Authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut()

    const fakeEmail = faker.internet.email()
    const fakePassword = faker.internet.password()

    simulateValidSubmit(sut, fakeEmail, fakePassword)

    expect(authenticationSpy.params).toEqual({
      email: fakeEmail,
      password: fakePassword,
    })
  })
  test('should call Authentication only once', async () => {
    const { sut, authenticationSpy } = makeSut()

    simulateValidSubmit(sut)
    simulateValidSubmit(sut)

    expect(authenticationSpy.callsCount).toBe(1)
  })
  test('should not call Authentication if form is invalid', async () => {
    const { sut, authenticationSpy } = makeSut({
      validationError: faker.random.words(),
    })

    populateEmailField(sut)
    fireEvent.submit(sut.getByTestId('form'))

    expect(authenticationSpy.callsCount).toBe(0)
  })
  test('should present error if authetication fails', async () => {
    const { sut, authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()

    authenticationSpy.auth = throwError(error)

    simulateValidSubmit(sut)

    testElementText(sut, 'main-error', error.message)

    testErrorWrapChildCount(sut, 1)
  })
  test('should call SaveAccessToken on success', async () => {
    const { sut, authenticationSpy, saveAccessTokenMock } = makeSut()

    simulateValidSubmit(sut)
    await waitFor(() => sut.getByTestId('form'))
    expect(saveAccessTokenMock.accessToken).toBe(authenticationSpy.result.accessToken)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })
  test('should present error if SaveAccessToken fails', async () => {
    const { sut, saveAccessTokenMock } = makeSut()
    const error = new InvalidCredentialsError()

    saveAccessTokenMock.save = throwError(error)

    simulateValidSubmit(sut)
    await waitFor(() => sut.getByTestId('form'))

    testElementText(sut, 'main-error', error.message)

    testErrorWrapChildCount(sut, 1)
  })
  test('should go to signup page', async () => {
    const { sut } = makeSut()

    const register = sut.getByTestId('signup')
    userEvent.click(register)

    expect(history.length).toBe(2)
    expect(history.location.pathname).toBe('/signup')
  })
})
