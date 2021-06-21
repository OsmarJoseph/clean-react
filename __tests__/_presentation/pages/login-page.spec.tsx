import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'
import { LoginPage } from '@/presentation/pages'

import { AuthenticationSpy } from '@/tests/_domain/mocks'
import { ValidationStub } from '@/tests/_presentation/mocks'
import { Helper, throwError } from '@/tests/helpers'

import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { fireEvent, render, RenderResult, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import faker from 'faker'
import { ApiProvider } from '@/presentation/store/context'

type SutParams = {
  validationError: string
}

type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
  setCurrentAccountMock: jest.Mock<any, any>
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSut = (sutParams?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  const setCurrentAccountMock = jest.fn()
  validationStub.result = sutParams?.validationError
  const sut = render(
    <ApiProvider setCurrentAccount={setCurrentAccountMock}>
      <Router history={history}>
        <LoginPage validation={validationStub} authentication={authenticationSpy} />
      </Router>
    </ApiProvider>,
  )
  return {
    sut,
    authenticationSpy,
    setCurrentAccountMock,
  }
}

const simulateValidSubmit = (
  sut: RenderResult,
  fakeEmail = faker.internet.email(),
  fakePassword = faker.internet.password(),
): void => {
  Helper.populateField(sut, 'email', fakeEmail)
  Helper.populateField(sut, 'password', fakePassword)

  clickSubmit(sut)
}

const clickSubmit = (sut: RenderResult): void => {
  userEvent.click(sut.getByTestId('submit'))
}
describe('LoginPage', () => {
  test('should start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })

    Helper.testButtonIsDisabled(sut, 'submit', true)

    Helper.testChildCount(sut, 'error-wrap', 0)
    Helper.testStatusForField(sut, 'email', validationError)
    Helper.testStatusForField(sut, 'password', validationError)
  })

  test('should show email error if validation fails', async () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })

    Helper.populateField(sut, 'email')

    Helper.testStatusForField(sut, 'email', validationError)
  })
  test('should show password error if validation fails', async () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })

    Helper.populateField(sut, 'password')

    Helper.testStatusForField(sut, 'password', validationError)
  })
  test('should show valid email state if validation succeeds', async () => {
    const { sut } = makeSut()

    Helper.populateField(sut, 'email')

    Helper.testStatusForField(sut, 'email')
  })

  test('should show valid password state if validation succeeds', async () => {
    const { sut } = makeSut()

    Helper.populateField(sut, 'password')

    Helper.testStatusForField(sut, 'password')
  })
  test('should enable submit button if form is valid', async () => {
    const { sut } = makeSut()

    Helper.populateField(sut, 'email')
    Helper.populateField(sut, 'password')

    Helper.testButtonIsDisabled(sut, 'submit', false)
  })
  test('should show loading spinner on submit', async () => {
    const { sut } = makeSut()

    simulateValidSubmit(sut)

    Helper.testElementExists(sut, 'spinner')
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

    Helper.populateField(sut, 'email')
    fireEvent.submit(sut.getByTestId('form'))

    expect(authenticationSpy.callsCount).toBe(0)
  })
  test('should present error if authetication fails', async () => {
    const { sut, authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()

    authenticationSpy.auth = throwError(error)

    simulateValidSubmit(sut)

    Helper.testElementText(sut, 'main-error', error.message)

    Helper.testChildCount(sut, 'error-wrap', 1)
  })
  test('should call SaveCurrentAccount on success', async () => {
    const { sut, authenticationSpy, setCurrentAccountMock } = makeSut()

    simulateValidSubmit(sut)
    await waitFor(() => sut.getByTestId('form'))
    expect(setCurrentAccountMock).toHaveBeenCalledWith(authenticationSpy.result)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })
  test('should present error if SaveCurrentAccount fails', async () => {
    const { sut, setCurrentAccountMock } = makeSut()
    const error = new UnexpectedError()

    setCurrentAccountMock.mockImplementationOnce(throwError(error))

    simulateValidSubmit(sut)
    await waitFor(() => sut.getByTestId('form'))

    Helper.testElementText(sut, 'main-error', error.message)

    Helper.testChildCount(sut, 'error-wrap', 1)
  })
  test('should go to signup page', async () => {
    const { sut } = makeSut()

    const register = sut.getByTestId('signup')
    userEvent.click(register)

    expect(history.length).toBe(2)
    expect(history.location.pathname).toBe('/signup')
  })
})
