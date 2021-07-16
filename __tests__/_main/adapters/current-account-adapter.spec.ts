import { LocalStorageAdapter } from '@/infra/cache'
import { getCurrentAccountAdapter, setCurrentAccountAdapter } from '@/main/adapters'
import { accountKey } from '@/main/constants'

import { throwError } from '@/tests/helpers'
import { mockAccountModel } from '@/tests/_domain/mocks'

jest.mock('@/infra/cache/local-storage-adapter')

describe('CurrentAccountAdapter', () => {
  describe('set', () => {
    test('should call LocalStorageAdapter with correct values', async () => {
      const account = mockAccountModel()
      const setSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set')
      await setCurrentAccountAdapter(account)
      expect(setSpy).toHaveBeenCalledWith(accountKey, account)
    })

    test('should throw if LocalStorage throws', async () => {
      jest.spyOn(LocalStorageAdapter.prototype, 'set').mockImplementationOnce(throwError())
      await expect(setCurrentAccountAdapter(mockAccountModel())).rejects.toThrow()
    })
  })
  describe('get', () => {
    test('should call LocalStorageAdapter with correct values', () => {
      const expected = mockAccountModel()
      const getSpy = jest.spyOn(LocalStorageAdapter.prototype, 'get').mockReturnValueOnce(expected)
      const account = getCurrentAccountAdapter()
      expect(getSpy).toHaveBeenCalledWith(accountKey)
      expect(account).toEqual(expected)
    })

    test('should throw if LocalStorage throws', () => {
      jest.spyOn(LocalStorageAdapter.prototype, 'get').mockReturnValueOnce(new Error())
      expect(getCurrentAccountAdapter()).toEqual(new Error())
    })
  })
})
