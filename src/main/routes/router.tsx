import { PrivateRoute } from '@/presentation/middlewares'
import { makeLogin, makeSignUp, makeSurveysList } from '@/main/factories'
import { env } from '@/main/config'

import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

export const Router = (): JSX.Element => {
  return (
    <BrowserRouter basename={env.basename}>
      <Switch>
        <Route path="/login" exact component={makeLogin} />
        <Route path="/signup" exact component={makeSignUp} />
        <PrivateRoute path="/" exact component={makeSurveysList} />
      </Switch>
    </BrowserRouter>
  )
}
