import { AccountModel } from '@/domain/models'
import { EmailInUseError } from '@/domain/errors'

import { AddAccountSpy } from '@/tests/_domain'
import { renderWithHistory, ValidationStub } from '@/tests/_presentation'
import { Helper, throwError } from '@/tests/helpers'

import { createMemoryHistory } from 'history'
import { fireEvent, waitFor, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import faker from 'faker'
import { SignUpPage } from '@/presentation/pages'

type SutTypes = {
  addAccountSpy: AddAccountSpy
  setCurrentAccountMock: (account: AccountModel) => void
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/signup'] })

const makeSut = (sutParams?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const addAccountSpy = new AddAccountSpy()
  validationStub.result = sutParams?.validationError

  const { setCurrentAccountMock } = renderWithHistory({
    component: () => SignUpPage({ validation: validationStub, addAccount: addAccountSpy }),
    history,
  })

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
}

describe('SignUpPage', () => {
  test('should start with initial state', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })

    expect(screen.getByTestId('submit')).toBeDisabled()

    expect(screen.getByTestId('error-wrap').children).toHaveLength(0)
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

    expect(screen.getByTestId('submit')).toBeEnabled()
  })
  test('should show loading spinner on submit', async () => {
    makeSut()

    simulateValidSubmit()
    clickSubmit()
    await waitFor(() => expect(screen.queryByTestId('spinner')).toBeInTheDocument())
  })
  test('should call AddAccount with correct values', async () => {
    const { addAccountSpy } = makeSut()

    const fakeName = faker.name.findName()
    const fakeEmail = faker.internet.email()
    const fakePassword = faker.internet.password()

    simulateValidSubmit(fakeName, fakeEmail, fakePassword)
    clickSubmit()

    await waitFor(() =>
      expect(addAccountSpy.params).toEqual({
        name: fakeName,
        email: fakeEmail,
        password: fakePassword,
        passwordConfirmation: fakePassword,
      }),
    )
  })

  test('should call AddAccount only once', async () => {
    const { addAccountSpy } = makeSut()

    simulateValidSubmit()
    clickSubmit()
    simulateValidSubmit()
    await waitFor(clickSubmit)

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
    clickSubmit()

    expect(screen.getByTestId('main-error')).toHaveTextContent(error.message)
    expect(screen.getByTestId('error-wrap').children).toHaveLength(1)
  })
  test('should call SaveCurrentAccount on success', async () => {
    const { addAccountSpy, setCurrentAccountMock } = makeSut()

    simulateValidSubmit()
    clickSubmit()
    await waitFor(() => screen.getByTestId('form'))
    expect(setCurrentAccountMock).toHaveBeenCalledWith(addAccountSpy.result)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })
  test('should present error if SaveCurrentAccount fails', async () => {
    const { addAccountSpy } = makeSut()
    const error = new EmailInUseError()

    jest.spyOn(addAccountSpy, 'add').mockImplementationOnce(throwError(error))

    simulateValidSubmit()
    clickSubmit()
    await waitFor(() => screen.getByTestId('form'))

    expect(screen.getByTestId('main-error')).toHaveTextContent(error.message)
    expect(screen.getByTestId('error-wrap').children).toHaveLength(1)
  })
  test('should go to login page', async () => {
    makeSut()

    const loginLink = screen.getByTestId('login')
    userEvent.click(loginLink)

    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/login')
  })
})
