import { RequiredFieldValidation } from '@/validation/validators'
import { RequiredFieldError } from '@/validation/errors'

import faker from 'faker'

type SutTypes = {
  sut: RequiredFieldValidation
}

const makeSut = (): SutTypes => {
  const sut = new RequiredFieldValidation(faker.database.column())
  return {
    sut,
  }
}

describe('RequiredFieldValidation', () => {
  test('should return error if field is empty', () => {
    const { sut } = makeSut()
    const error = sut.validate('')
    expect(error).toEqual(new RequiredFieldError())
  })
  test('should return falsy if field is not empty', () => {
    const { sut } = makeSut()
    const error = sut.validate(faker.random.word())
    expect(error).toBeFalsy()
  })
})
