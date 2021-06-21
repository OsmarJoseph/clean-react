import '@/presentation/styles/global.scss'
import { ApiProvider } from '@/presentation/store/context'
import { Router } from '@/main/routes'
import { setCurrentAccountAdapter } from '@/main/adapters'

import React from 'react'

export const App = (): JSX.Element => {
  return (
    <ApiProvider setCurrentAccount={setCurrentAccountAdapter}>
      <Router />
    </ApiProvider>
  )
}
