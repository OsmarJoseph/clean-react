import { AccountModel } from '@/domain/models'
import { accountKey } from '@/constants'

import { mockAccountModel } from '@/tests/_domain'
import { setLocalStorageItem, getLocalStorageItem } from '@/tests/cypress'

export const mockAccountStorage = (): void => {
  setLocalStorageItem(accountKey, mockAccountModel())
}
export const getAccountStorage = (): AccountModel => {
  return getLocalStorageItem(accountKey)
}
