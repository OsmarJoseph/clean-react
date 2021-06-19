import {
  makeRemoteAddAccount,
  makeSignUpValidation,
  makeSaveCurrentAccount,
} from '@/main/factories'
import { SignUpPage } from '@/presentation/pages'

import React from 'react'

export const makeSignUp = (): JSX.Element => {
  return (
    <SignUpPage
      validation={makeSignUpValidation()}
      addAccount={makeRemoteAddAccount()}
      saveCurrentAccount={makeSaveCurrentAccount()}
    />
  )
}
