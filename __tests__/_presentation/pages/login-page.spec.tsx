import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'
import { LoginPage } from '@/presentation/pages'

import { AuthenticationSpy } from '@/tests/_domain/mocks'
import { ValidationStub } from '@/tests/_presentation/mocks'
import { Helper, throwError } from '@/tests/helpers'

import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { fireEvent, render, waitFor, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import faker from 'faker'
import { ApiProvider } from '@/presentation/store/context'

type SutParams = {
  validationError: string
}

type SutTypes = {
  authenticationSpy: AuthenticationSpy
  setCurrentAccountMock: jest.Mock<any, any>
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSut = (sutParams?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  const setCurrentAccountMock = jest.fn()
  validationStub.result = sutParams?.validationError
  render(
    <ApiProvider setCurrentAccount={setCurrentAccountMock} getCurrentAccount={jest.fn()}>
      <Router history={history}>
        <LoginPage validation={validationStub} authentication={authenticationSpy} />
      </Router>
    </ApiProvider>,
  )
  return {
    authenticationSpy,
    setCurrentAccountMock,
  }
}

const simulateValidSubmit = (
  fakeEmail = faker.internet.email(),
  fakePassword = faker.internet.password(),
): void => {
  Helper.populateField('email', fakeEmail)
  Helper.populateField('password', fakePassword)
}

const clickSubmit = (): void => {
  userEvent.click(screen.getByTestId('submit'))
}
describe('LoginPage', () => {
  test('should start with initial state', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })

    expect(screen.getByTestId('submit')).toBeDisabled()

    expect(screen.getByTestId('error-wrap').children).toHaveLength(0)
    Helper.testStatusForField('email', validationError)
    Helper.testStatusForField('password', validationError)
  })

  test('should show email error if validation fails', async () => {
    const validationError = faker.random.words()
    makeSut({ validationError })

    Helper.populateField('email')

    Helper.testStatusForField('email', validationError)
  })
  test('should show password error if validation fails', async () => {
    const validationError = faker.random.words()
    makeSut({ validationError })

    Helper.populateField('password')

    Helper.testStatusForField('password', validationError)
  })
  test('should show valid email state if validation succeeds', async () => {
    makeSut()

    Helper.populateField('email')

    Helper.testStatusForField('email')
  })

  test('should show valid password state if validation succeeds', async () => {
    makeSut()

    Helper.populateField('password')

    Helper.testStatusForField('password')
  })
  test('should enable submit button if form is valid', async () => {
    makeSut()

    Helper.populateField('email')
    Helper.populateField('password')

    expect(screen.getByTestId('submit')).toBeEnabled()
  })
  test('should show loading spinner on submit', async () => {
    makeSut()

    act(simulateValidSubmit)
    clickSubmit()

    await waitFor(() => expect(screen.queryByTestId('spinner')).toBeInTheDocument())
  })
  test('should call Authentication with correct values', async () => {
    const { authenticationSpy } = makeSut()

    const fakeEmail = faker.internet.email()
    const fakePassword = faker.internet.password()

    simulateValidSubmit(fakeEmail, fakePassword)
    clickSubmit()

    await waitFor(() =>
      expect(authenticationSpy.params).toEqual({
        email: fakeEmail,
        password: fakePassword,
      }),
    )
  })
  test('should call Authentication only once', async () => {
    const { authenticationSpy } = makeSut()

    simulateValidSubmit()
    clickSubmit()
    simulateValidSubmit()
    await waitFor(clickSubmit)
    expect(authenticationSpy.callsCount).toBe(1)
  })
  test('should not call Authentication if form is invalid', async () => {
    const { authenticationSpy } = makeSut({
      validationError: faker.random.words(),
    })

    Helper.populateField('email')
    fireEvent.submit(screen.getByTestId('form'))

    expect(authenticationSpy.callsCount).toBe(0)
  })
  test('should present error if authetication fails', async () => {
    const { authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()

    authenticationSpy.auth = throwError(error)

    simulateValidSubmit()
    clickSubmit()

    expect(screen.getByTestId('main-error')).toHaveTextContent(error.message)
    expect(screen.getByTestId('error-wrap').children).toHaveLength(1)
  })
  test('should call SaveCurrentAccount on success', async () => {
    const { authenticationSpy, setCurrentAccountMock } = makeSut()

    simulateValidSubmit()
    clickSubmit()

    await waitFor(() => screen.getByTestId('form'))
    expect(setCurrentAccountMock).toHaveBeenCalledWith(authenticationSpy.result)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })
  test('should present error if SaveCurrentAccount fails', async () => {
    const { setCurrentAccountMock } = makeSut()
    const error = new UnexpectedError()

    setCurrentAccountMock.mockImplementationOnce(throwError(error))

    simulateValidSubmit()
    clickSubmit()

    await waitFor(() => screen.getByTestId('form'))

    expect(screen.getByTestId('main-error')).toHaveTextContent(error.message)
    expect(screen.getByTestId('error-wrap').children).toHaveLength(1)
  })
  test('should go to signup page', async () => {
    makeSut()

    const register = screen.getByTestId('signup')
    userEvent.click(register)

    expect(history.length).toBe(2)
    expect(history.location.pathname).toBe('/signup')
  })
})
