import { AccountModel } from '@/domain/models'

import React, { createContext, useContext } from 'react'

export type ApiContextType = {
  setCurrentAccount: (account: AccountModel) => Promise<void>
  getCurrentAccount: () => AccountModel
}

const ApiContext = createContext<ApiContextType>(null)

type ApiProviderProps = {
  children: JSX.Element
  setCurrentAccount: (account: AccountModel) => Promise<void>
  getCurrentAccount: () => AccountModel
}

export function ApiProvider({
  children,
  setCurrentAccount,
  getCurrentAccount,
}: ApiProviderProps): JSX.Element {
  const value = {
    setCurrentAccount,
    getCurrentAccount,
  }
  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>
}

export const useApiContext = (): ApiContextType => useContext(ApiContext)
