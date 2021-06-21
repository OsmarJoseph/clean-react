import { LocalStorageAdapter } from '@/infra/cache'

import 'jest-localstorage-mock'
import faker from 'faker'

type SutTypes = {
  sut: LocalStorageAdapter
}
const makeSut = (): SutTypes => {
  const sut = new LocalStorageAdapter()
  return {
    sut,
  }
}

describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear()
  })
  test('should call localStorage with correct values', () => {
    const { sut } = makeSut()
    const key = faker.random.word()
    const value = faker.random.objectElement<{ key: string; value: string }>()

    sut.set(key, value)

    expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value))
  })
})
