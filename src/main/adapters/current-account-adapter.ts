import { UnexpectedError } from '@/domain/errors'
import { AccountModel } from '@/domain/models'
import { makeLocalStorageAdapter } from '@/main/factories'
import { accountKey } from '@/main/constants'

export const setCurrentAccountAdapter = async (account: AccountModel): Promise<void> => {
  if (!account?.accessToken) {
    throw new UnexpectedError()
  }
  makeLocalStorageAdapter().set(accountKey, account)
}

export const getCurrentAccountAdapter = (): AccountModel => {
  return makeLocalStorageAdapter().get(accountKey)
}
