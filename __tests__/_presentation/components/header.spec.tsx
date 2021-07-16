import { Header } from '@/presentation/components'

import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory, MemoryHistory } from 'history'
import { render, screen, waitFor } from '@testing-library/react'
import { ApiProvider } from '@/presentation/store/context'
import userEvent from '@testing-library/user-event'

type SutTypes = {
  history: MemoryHistory<unknown>
  setCurrentAccountMock: jest.Mock<any, any>
}

const history = createMemoryHistory({ initialEntries: ['/'] })

const makeSut = (): SutTypes => {
  const setCurrentAccountMock = jest.fn()

  render(
    <ApiProvider setCurrentAccount={setCurrentAccountMock} getCurrentAccount={jest.fn()}>
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
      expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)

      await waitFor(() => screen.getByTestId('logout'))
      expect(history.location.pathname).toBe('/login')
    })
  })
})
