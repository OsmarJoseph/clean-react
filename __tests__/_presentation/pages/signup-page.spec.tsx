import { EmailInUseError } from '@/domain/errors'
import { SignUpPage } from '@/presentation/pages'

import { AddAccountSpy, SaveAccessTokenMock } from '@/tests/_domain/mocks'
import { Helper, throwError } from '@/tests/helpers'
import { ValidationStub } from '@/tests/_presentation/mocks'

import React from 'react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { fireEvent, render, RenderResult, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import faker from 'faker'

type SutTypes = {
  sut: RenderResult
  addAccountSpy: AddAccountSpy
  saveAccessTokenMock: SaveAccessTokenMock
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/signup'] })

const makeSut = (sutParams?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const addAccountSpy = new AddAccountSpy()
  const saveAccessTokenMock = new SaveAccessTokenMock()
  validationStub.result = sutParams?.validationError
  const sut = render(
    <Router history={history}>
      <SignUpPage
        validation={validationStub}
        addAccount={addAccountSpy}
        saveAccessToken={saveAccessTokenMock}
      />
    </Router>,
  )

  return {
    sut,
    addAccountSpy,
    saveAccessTokenMock,
  }
}

const clickSubmit = (sut: RenderResult): void => {
  userEvent.click(sut.getByTestId('submit'))
}

const simulateValidSubmit = (
  sut: RenderResult,
  fakeName = faker.name.findName(),
  fakeEmail = faker.internet.email(),
  fakePassword = faker.internet.password(),
): void => {
  Helper.populateField(sut, 'name', fakeName)
  Helper.populateField(sut, 'email', fakeEmail)
  Helper.populateField(sut, 'password', fakePassword)
  Helper.populateField(sut, 'passwordConfirmation', fakePassword)

  clickSubmit(sut)
}

describe('SignUpPage', () => {
  test('should start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })

    Helper.testButtonIsDisabled(sut, 'submit', true)

    Helper.testChildCount(sut, 'error-wrap', 0)
    Helper.testStatusForField(sut, 'name', validationError)
    Helper.testStatusForField(sut, 'email', validationError)
    Helper.testStatusForField(sut, 'password', validationError)
    Helper.testStatusForField(sut, 'passwordConfirmation', validationError)
  })
  test('should show name error if Validation fails', async () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })

    Helper.populateField(sut, 'name')

    Helper.testStatusForField(sut, 'name', validationError)
  })
  test('should show email error if Validation fails', async () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })

    Helper.populateField(sut, 'email')

    Helper.testStatusForField(sut, 'email', validationError)
  })
  test('should show password error if Validation fails', async () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })

    Helper.populateField(sut, 'password')

    Helper.testStatusForField(sut, 'password', validationError)
  })
  test('should show passwordConfirmation error if Validation fails', async () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })

    Helper.populateField(sut, 'passwordConfirmation')

    Helper.testStatusForField(sut, 'passwordConfirmation', validationError)
  })
  test('should show valid name state if validation succeeds', async () => {
    const { sut } = makeSut()

    Helper.populateField(sut, 'name')

    Helper.testStatusForField(sut, 'name')
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
  test('should show valid passwordConfirmation state if validation succeeds', async () => {
    const { sut } = makeSut()

    Helper.populateField(sut, 'passwordConfirmation')

    Helper.testStatusForField(sut, 'passwordConfirmation')
  })
  test('should enable submit button if form is valid', async () => {
    const { sut } = makeSut()

    Helper.populateField(sut, 'name')
    Helper.populateField(sut, 'email')
    Helper.populateField(sut, 'password')
    Helper.populateField(sut, 'passwordConfirmation')

    Helper.testButtonIsDisabled(sut, 'submit', false)
  })
  test('should show loading spinner on submit', async () => {
    const { sut } = makeSut()

    simulateValidSubmit(sut)

    Helper.testElementExists(sut, 'spinner')
  })
  test('should call AddAccount with correct values', async () => {
    const { sut, addAccountSpy } = makeSut()

    const fakeName = faker.name.findName()
    const fakeEmail = faker.internet.email()
    const fakePassword = faker.internet.password()

    simulateValidSubmit(sut, fakeName, fakeEmail, fakePassword)

    expect(addAccountSpy.params).toEqual({
      name: fakeName,
      email: fakeEmail,
      password: fakePassword,
      passwordConfirmation: fakePassword,
    })
  })

  test('should call AddAccount only once', async () => {
    const { sut, addAccountSpy } = makeSut()

    simulateValidSubmit(sut)
    simulateValidSubmit(sut)

    expect(addAccountSpy.callsCount).toBe(1)
  })
  test('should not call AddAccount if form is invalid', async () => {
    const { sut, addAccountSpy } = makeSut({
      validationError: faker.random.words(),
    })

    Helper.populateField(sut, 'email')
    fireEvent.submit(sut.getByTestId('form'))

    expect(addAccountSpy.callsCount).toBe(0)
  })
  test('should present error if authetication fails', async () => {
    const { sut, addAccountSpy } = makeSut()
    const error = new EmailInUseError()

    addAccountSpy.add = throwError(error)

    simulateValidSubmit(sut)

    Helper.testElementText(sut, 'main-error', error.message)

    Helper.testChildCount(sut, 'error-wrap', 1)
  })
  test('should call SaveAccessToken on success', async () => {
    const { sut, addAccountSpy, saveAccessTokenMock } = makeSut()

    simulateValidSubmit(sut)
    await waitFor(() => sut.getByTestId('form'))
    expect(saveAccessTokenMock.accessToken).toBe(addAccountSpy.result.accessToken)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })
  test('should present error if SaveAccessToken fails', async () => {
    const { sut, saveAccessTokenMock } = makeSut()
    const error = new EmailInUseError()

    saveAccessTokenMock.save = throwError(error)

    simulateValidSubmit(sut)
    await waitFor(() => sut.getByTestId('form'))

    Helper.testElementText(sut, 'main-error', error.message)

    Helper.testChildCount(sut, 'error-wrap', 1)
  })
  test('should go to login page', async () => {
    const { sut } = makeSut()

    const loginLink = sut.getByTestId('login')
    userEvent.click(loginLink)

    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/login')
  })
})
