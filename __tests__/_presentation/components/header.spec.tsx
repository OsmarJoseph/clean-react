import { AccountModel } from '@/domain/models'
import { Header } from '@/presentation/components'

import { mockAccountModel } from '@/tests/_domain/mocks'

import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory, MemoryHistory } from 'history'
import { render, screen, waitFor } from '@testing-library/react'
import { ApiProvider } from '@/presentation/store/context'
import userEvent from '@testing-library/user-event'

type SutTypes = {
  history: MemoryHistory<unknown>
  setCurrentAccountMock: (account: AccountModel) => void
}

const history = createMemoryHistory({ initialEntries: ['/'] })

const makeSut = (account = mockAccountModel()): SutTypes => {
  const setCurrentAccountMock = jest.fn()
  const getCurrentAccountMock = (): AccountModel => account

  render(
    <ApiProvider
      setCurrentAccount={setCurrentAccountMock}
      getCurrentAccount={getCurrentAccountMock}
    >
      <Router history={history}>
        <Header />
      </Router>
    </ApiProvider>,
  )

  return { history, setCurrentAccountMock }
}

describe('Header Component', () => {
  describe('logout', () => {
    test('should call setCurrentAccount with null', async () => {
      const { history, setCurrentAccountMock } = makeSut()

      userEvent.click(screen.getByTestId('logout'))
      expect(setCurrentAccountMock).toHaveBeenCalledWith(null)

      await waitFor(() => screen.getByTestId('logout'))
      expect(history.location.pathname).toBe('/login')
    })
  })
  describe('username', () => {
    test('should render username correctly', async () => {
      const account = mockAccountModel()
      makeSut(account)
      expect(screen.getByTestId('username')).toHaveTextContent(account.name)
    })
  })
})
