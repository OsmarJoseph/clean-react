import { LocalStorageAdapter } from '@/infra/cache'

import { mockObject } from '@/tests/helpers'

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
  describe('set', () => {
    test('should call localStorage with correct values', () => {
      const { sut } = makeSut()
      const key = faker.random.word()
      const value = mockObject()

      sut.set(key, value)

      expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value))
    })
    test('should call localStorage.removeItem if value is null', () => {
      const { sut } = makeSut()
      const key = faker.random.word()

      sut.set(key, undefined)

      expect(localStorage.removeItem).toHaveBeenCalledWith(key)
    })
  })
  describe('get', () => {
    test('should call localStorage with correct values', () => {
      const { sut } = makeSut()
      const key = faker.random.word()
      const value = mockObject()

      jest.spyOn(localStorage, 'getItem').mockReturnValueOnce(JSON.stringify(value))

      const response = sut.get(key)
      expect(response).toEqual(value)
      expect(localStorage.getItem).toHaveBeenCalledWith(key)
    })
  })
})
