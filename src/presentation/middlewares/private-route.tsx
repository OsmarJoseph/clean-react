import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'

import { useApiContext } from '@/presentation/store/context'

type Props = RouteProps

export const PrivateRoute = (props: Props): JSX.Element => {
  const { getCurrentAccount } = useApiContext()

  const component = getCurrentAccount()?.accessToken
    ? props.component
    : () => <Redirect to="/login" />

  return <Route {...props} component={component} />
}
