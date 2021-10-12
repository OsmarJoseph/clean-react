import { AccountModel } from '@/domain/models'
import { ApiProvider } from '@/presentation/store/context'

import { mockAccountModel } from '@/tests/_domain'

import React from 'react'
import { MemoryHistory } from 'history'
import { Router } from 'react-router'
import { render } from '@testing-library/react'

type Params = {
  component: (props: unknown) => JSX.Element
  history: MemoryHistory
  account?: AccountModel
}

type Result = {
  setCurrentAccountMock: (account: AccountModel) => void
}

export const renderWithHistory = ({
  component: Component,
  history,
  account = mockAccountModel(),
}: Params): Result => {
  const setCurrentAccountMock = jest.fn()
  const getCurrentAccount = (): AccountModel => account
  render(
    <ApiProvider setCurrentAccount={setCurrentAccountMock} getCurrentAccount={getCurrentAccount}>
      <Router history={history}>{<Component />}</Router>
    </ApiProvider>,
  )

  return { setCurrentAccountMock }
}
