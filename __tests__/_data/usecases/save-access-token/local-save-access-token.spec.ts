import { LocalSaveAccessToken } from '@/data/usecases'
import { throwError } from '@/tests/helpers'

import { SetStorageMock } from '@/tests/_data/mocks'

import faker from 'faker'

type SutTypes = {
  sut: LocalSaveAccessToken
  setStorageMock: SetStorageMock
}

const makeSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock()
  const sut = new LocalSaveAccessToken(setStorageMock)

  return {
    sut,
    setStorageMock,
  }
}

describe('LocalSaveAccessToken', () => {
  test('should call SetStorage with correct values', async () => {
    const { sut, setStorageMock } = makeSut()
    const accessToken = faker.random.words()
    await sut.save(accessToken)
    expect(setStorageMock.key).toBe('accessToken')
    expect(setStorageMock.value).toBe(accessToken)
  })
  test('should call throw if SetStorage throws', async () => {
    const { sut, setStorageMock } = makeSut()
    setStorageMock.set = throwError()
    const resultPromise = sut.save(faker.random.words())
    await expect(resultPromise).rejects.toThrow(new Error())
  })
})
