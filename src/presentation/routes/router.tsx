import { LoginPage } from '@/presentation/pages'
import { AuthenticationSpy } from '@/__tests__/_domain/mocks'
import { ValidationStub } from '@/__tests__/_presentation/mocks'

import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

export const Router = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact>
          <LoginPage validation={new ValidationStub()} authentication={new AuthenticationSpy()} />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
