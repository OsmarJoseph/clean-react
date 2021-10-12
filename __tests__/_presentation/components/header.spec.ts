import { AccountModel } from '@/domain/models'
import { Header } from '@/presentation/components'

import { mockAccountModel } from '@/tests/_domain'
import { renderWithHistory } from '@/tests/_presentation'

import { createMemoryHistory, MemoryHistory } from 'history'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

type SutTypes = {
  history: MemoryHistory<unknown>
  setCurrentAccountMock: (account: AccountModel) => void
}

const history = createMemoryHistory({ initialEntries: ['/'] })

const makeSut = (account = mockAccountModel()): SutTypes => {
  const { setCurrentAccountMock } = renderWithHistory({
    component: Header,
    account,
    history,
  })

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
