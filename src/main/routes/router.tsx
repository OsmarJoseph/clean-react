import { SurveysListPage } from '@/presentation/pages'
import { makeLogin, makeSignUp } from '@/main/factories'

import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

export const Router = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={makeLogin} />
        <Route path="/signup" exact component={makeSignUp} />
        <Route path="/" exact component={SurveysListPage} />
      </Switch>
    </BrowserRouter>
  )
}
