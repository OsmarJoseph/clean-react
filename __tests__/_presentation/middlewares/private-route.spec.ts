import { PrivateRoute } from '@/presentation/middlewares'

import { mockAccountModel } from '@/tests/_domain'
import { renderWithHistory } from '@/tests/_presentation'

import { createMemoryHistory, MemoryHistory } from 'history'
import { AccountModel } from '@/domain/models'

type SutTypes = {
  history: MemoryHistory<unknown>
}

const makeSut = (account?: AccountModel): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  renderWithHistory({
    component: () => PrivateRoute({}),
    account,
    history,
  })
  return { history }
}

describe('PrivateRoute', () => {
  test('should redirect to /login if token is empty', () => {
    const { history } = makeSut(null)
    expect(history.location.pathname).toBe('/login')
  })
  test('should render current component if token valid', () => {
    const { history } = makeSut(mockAccountModel())
    expect(history.location.pathname).toBe('/')
  })
})
