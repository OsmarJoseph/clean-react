import { LocalSaveAccessToken } from '@/data/usecases'

import { SetStorageSpy } from '@/tests/_data/mocks'

import faker from 'faker'

type SutTypes = {
  sut: LocalSaveAccessToken
  setStorageSpy: SetStorageSpy
}

const makeSut = (): SutTypes => {
  const setStorageSpy = new SetStorageSpy()
  const sut = new LocalSaveAccessToken(setStorageSpy)

  return {
    sut,
    setStorageSpy,
  }
}

describe('LocalSaveAccessToken', () => {
  test('should call SetStorage with correct values', async () => {
    const { sut, setStorageSpy } = makeSut()
    const accessToken = faker.random.words()
    await sut.save(accessToken)
    expect(setStorageSpy.key).toBe('accessToken')
    expect(setStorageSpy.value).toBe(accessToken)
  })
})
