import { AccountModel } from '@/domain/models'

import React, { createContext, useContext } from 'react'

export type ApiContextType = {
  setCurrentAccount: (account: AccountModel) => Promise<void>
}

const ApiContext = createContext<ApiContextType>(null)

type ApiProviderProps = {
  children: JSX.Element
  setCurrentAccount: (account: AccountModel) => Promise<void>
}

export function ApiProvider({ children, setCurrentAccount }: ApiProviderProps): JSX.Element {
  const value = {
    setCurrentAccount,
  }
  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>
}

export const useApiContext = (): ApiContextType => useContext(ApiContext)
