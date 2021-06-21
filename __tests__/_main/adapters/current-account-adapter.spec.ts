import { UnexpectedError } from '@/domain/errors'
import { LocalStorageAdapter } from '@/infra/cache'
import { setCurrentAccountAdapter } from '@/main/adapters'

import { mockAccountModel } from '@/tests/_domain/mocks'

jest.mock('@/infra/cache/local-storage-adapter')

describe('CurrentAccountAdapter', () => {
  test('should call LocalStorageAdapter with correct values', async () => {
    const account = mockAccountModel()
    const setSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set')
    await setCurrentAccountAdapter(account)
    expect(setSpy).toHaveBeenCalledWith('account', account)
  })

  test('should throw UnexpectedError', async () => {
    await expect(async () => {
      await setCurrentAccountAdapter(undefined)
    }).rejects.toThrow(new UnexpectedError())
  })
})
