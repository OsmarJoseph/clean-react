import { makeRemoteAuthentication, makeLoginValidation } from '@/main/factories'
import { LoginPage } from '@/presentation/pages'

import React from 'react'

export const makeLogin = (): JSX.Element => {
  return (
    <LoginPage validation={makeLoginValidation()} authentication={makeRemoteAuthentication()} />
  )
}
