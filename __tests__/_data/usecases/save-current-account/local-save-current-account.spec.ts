import { LocalSaveCurrentAccount } from '@/data/usecases'
import { UnexpectedError } from '@/domain/errors'

import { mockAccountModel } from '@/tests/_domain/mocks'
import { SetStorageMock } from '@/tests/_data/mocks'
import { throwError } from '@/tests/helpers'

type SutTypes = {
  sut: LocalSaveCurrentAccount
  setStorageMock: SetStorageMock
}

const makeSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock()
  const sut = new LocalSaveCurrentAccount(setStorageMock)

  return {
    sut,
    setStorageMock,
  }
}

describe('LocalSaveCurrentAccount', () => {
  test('should call SetStorage with correct values', async () => {
    const { sut, setStorageMock } = makeSut()
    const account = mockAccountModel()
    await sut.save(account)
    expect(setStorageMock.key).toBe('account')
    expect(setStorageMock.value).toBe(JSON.stringify(account))
  })
  test('should call throw if SetStorage throws', async () => {
    const { sut, setStorageMock } = makeSut()
    setStorageMock.set = throwError()
    const resultPromise = sut.save(mockAccountModel())
    await expect(resultPromise).rejects.toThrow(new Error())
  })
  test('should call throw if account is falsy', async () => {
    const { sut } = makeSut()
    const resultPromise = sut.save(undefined)
    await expect(resultPromise).rejects.toThrow(new UnexpectedError())
  })
})
