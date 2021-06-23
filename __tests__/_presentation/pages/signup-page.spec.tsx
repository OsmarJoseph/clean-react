import { EmailInUseError } from '@/domain/errors'
import { SignUpPage } from '@/presentation/pages'
import { ApiProvider } from '@/presentation/store/context'

import { AddAccountSpy } from '@/tests/_domain/mocks'
import { Helper, throwError } from '@/tests/helpers'
import { ValidationStub } from '@/tests/_presentation/mocks'

import React from 'react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { fireEvent, render, waitFor, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import faker from 'faker'

type SutTypes = {
  addAccountSpy: AddAccountSpy
  setCurrentAccountMock: jest.Mock<any, any>
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/signup'] })

const makeSut = (sutParams?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const addAccountSpy = new AddAccountSpy()
  const setCurrentAccountMock = jest.fn()
  validationStub.result = sutParams?.validationError
  render(
    <ApiProvider setCurrentAccount={setCurrentAccountMock} getCurrentAccount={jest.fn()}>
      <Router history={history}>
        <SignUpPage validation={validationStub} addAccount={addAccountSpy} />
      </Router>
    </ApiProvider>,
  )

  return {
    addAccountSpy,
    setCurrentAccountMock,
  }
}

const clickSubmit = (): void => {
  userEvent.click(screen.getByTestId('submit'))
}

const simulateValidSubmit = (
  fakeName = faker.name.findName(),
  fakeEmail = faker.internet.email(),
  fakePassword = faker.internet.password(),
): void => {
  Helper.populateField('name', fakeName)
  Helper.populateField('email', fakeEmail)
  Helper.populateField('password', fakePassword)
  Helper.populateField('passwordConfirmation', fakePassword)

  clickSubmit()
}

describe('SignUpPage', () => {
  test('should start with initial state', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })

    Helper.testButtonIsDisabled('submit', true)

    Helper.testChildCount('error-wrap', 0)
    Helper.testStatusForField('name', validationError)
    Helper.testStatusForField('email', validationError)
    Helper.testStatusForField('password', validationError)
    Helper.testStatusForField('passwordConfirmation', validationError)
  })
  test('should show name error if Validation fails', async () => {
    const validationError = faker.random.words()
    makeSut({ validationError })

    Helper.populateField('name')

    Helper.testStatusForField('name', validationError)
  })
  test('should show email error if Validation fails', async () => {
    const validationError = faker.random.words()
    makeSut({ validationError })

    Helper.populateField('email')

    Helper.testStatusForField('email', validationError)
  })
  test('should show password error if Validation fails', async () => {
    const validationError = faker.random.words()
    makeSut({ validationError })

    Helper.populateField('password')

    Helper.testStatusForField('password', validationError)
  })
  test('should show passwordConfirmation error if Validation fails', async () => {
    const validationError = faker.random.words()
    makeSut({ validationError })

    Helper.populateField('passwordConfirmation')

    Helper.testStatusForField('passwordConfirmation', validationError)
  })
  test('should show valid name state if validation succeeds', async () => {
    makeSut()

    Helper.populateField('name')

    Helper.testStatusForField('name')
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
  test('should show valid passwordConfirmation state if validation succeeds', async () => {
    makeSut()

    Helper.populateField('passwordConfirmation')

    Helper.testStatusForField('passwordConfirmation')
  })
  test('should enable submit button if form is valid', async () => {
    makeSut()

    Helper.populateField('name')
    Helper.populateField('email')
    Helper.populateField('password')
    Helper.populateField('passwordConfirmation')

    Helper.testButtonIsDisabled('submit', false)
  })
  test('should show loading spinner on submit', async () => {
    makeSut()

    simulateValidSubmit()

    Helper.testElementExists('spinner')
  })
  test('should call AddAccount with correct values', async () => {
    const { addAccountSpy } = makeSut()

    const fakeName = faker.name.findName()
    const fakeEmail = faker.internet.email()
    const fakePassword = faker.internet.password()

    simulateValidSubmit(fakeName, fakeEmail, fakePassword)

    expect(addAccountSpy.params).toEqual({
      name: fakeName,
      email: fakeEmail,
      password: fakePassword,
      passwordConfirmation: fakePassword,
    })
  })

  test('should call AddAccount only once', async () => {
    const { addAccountSpy } = makeSut()

    simulateValidSubmit()
    simulateValidSubmit()

    expect(addAccountSpy.callsCount).toBe(1)
  })
  test('should not call AddAccount if form is invalid', async () => {
    const { addAccountSpy } = makeSut({
      validationError: faker.random.words(),
    })

    Helper.populateField('email')
    fireEvent.submit(screen.getByTestId('form'))

    expect(addAccountSpy.callsCount).toBe(0)
  })
  test('should present error if authetication fails', async () => {
    const { addAccountSpy } = makeSut()
    const error = new EmailInUseError()

    addAccountSpy.add = throwError(error)

    simulateValidSubmit()

    Helper.testElementText('main-error', error.message)

    Helper.testChildCount('error-wrap', 1)
  })
  test('should call SaveCurrentAccount on success', async () => {
    const { addAccountSpy, setCurrentAccountMock } = makeSut()

    simulateValidSubmit()
    await waitFor(() => screen.getByTestId('form'))
    expect(setCurrentAccountMock).toHaveBeenCalledWith(addAccountSpy.result)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })
  test('should present error if SaveCurrentAccount fails', async () => {
    const { setCurrentAccountMock } = makeSut()
    const error = new EmailInUseError()

    setCurrentAccountMock.mockImplementationOnce(throwError(error))

    simulateValidSubmit()
    await waitFor(() => screen.getByTestId('form'))

    Helper.testElementText('main-error', error.message)

    Helper.testChildCount('error-wrap', 1)
  })
  test('should go to login page', async () => {
    makeSut()

    const loginLink = screen.getByTestId('login')
    userEvent.click(loginLink)

    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/login')
  })
})
