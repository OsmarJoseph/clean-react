import { makeLogin, makeSignUp } from '@/main/factories'
import { Router } from '@/main/routes'
import '@/presentation/styles/global.scss'

import React from 'react'

export const App = (): JSX.Element => {
  return <Router makeLogin={makeLogin} makeSignUp={makeSignUp} />
}
