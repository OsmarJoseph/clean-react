import { PrivateRoute } from '@/presentation/middlewares'
import { ApiProvider } from '@/presentation/store/context'

import { mockAccountModel } from '@/tests/_domain'

import React from 'react'
import { Router } from 'react-router-dom'
import { render } from '@testing-library/react'
import { createMemoryHistory, MemoryHistory } from 'history'
import { AccountModel } from '@/domain/models'

type SutTypes = {
  history: MemoryHistory<unknown>
}

const makeSut = (account?: AccountModel): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  render(
    <ApiProvider setCurrentAccount={jest.fn()} getCurrentAccount={() => account}>
      <Router history={history}>
        <PrivateRoute />
      </Router>
    </ApiProvider>,
  )
  return { history }
}

describe('PrivateRoute', () => {
  test('should redirect to /login if token is empty', () => {
    const { history } = makeSut()
    expect(history.location.pathname).toBe('/login')
  })
  test('should render current component if token valid', () => {
    const { history } = makeSut(mockAccountModel())
    expect(history.location.pathname).toBe('/')
  })
})
