import { SurveysListPage } from '@/presentation/pages'
import { PrivateRoute } from '@/presentation/middlewares'
import { makeLogin, makeSignUp } from '@/main/factories'

import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

export const Router = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={makeLogin} />
        <Route path="/signup" exact component={makeSignUp} />
        <PrivateRoute path="/" exact component={SurveysListPage} />
      </Switch>
    </BrowserRouter>
  )
}
