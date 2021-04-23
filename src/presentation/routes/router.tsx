import {LoginPage} from '@/presentation/pages'

import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'

export const Router = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login' exact>
          <LoginPage validation={} authentication={} />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
