import { UnexpectedError } from '@/domain/errors'
import { AccountModel } from '@/domain/models'
import { makeLocalStorageAdapter } from '@/main/factories'

export const setCurrentAccountAdapter = async (account: AccountModel): Promise<void> => {
  if (!account?.accessToken) {
    throw new UnexpectedError()
  }
  makeLocalStorageAdapter().set('account', account)
}
