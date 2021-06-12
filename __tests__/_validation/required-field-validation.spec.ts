import { RequiredFieldValidation } from '@/validation/validators'
import { RequiredFieldError } from '@/validation/errors'

import faker from 'faker'

type SutTypes = {
  sut: RequiredFieldValidation
  field: string
}

const makeSut = (): SutTypes => {
  const field = faker.database.column()
  const sut = new RequiredFieldValidation(field)
  return {
    sut,
    field,
  }
}

describe('RequiredFieldValidation', () => {
  test('should return error if field is empty', () => {
    const { sut, field } = makeSut()
    const error = sut.validate({ [field]: '' })
    expect(error).toEqual(new RequiredFieldError())
  })
  test('should return falsy if field is not empty', () => {
    const { sut, field } = makeSut()
    const error = sut.validate({ [field]: faker.random.word() })
    expect(error).toBeFalsy()
  })
})
