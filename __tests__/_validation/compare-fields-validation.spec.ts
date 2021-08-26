import { CompareFieldsValidation } from '@/validation/validators'
import { InvalidFieldError } from '@/validation/errors'

import faker from 'faker'

type SutTypes = {
  sut: CompareFieldsValidation
  field: string
}

const makeSut = (fieldToCompare: string): SutTypes => {
  const field = faker.database.column()

  const sut = new CompareFieldsValidation(field, fieldToCompare)
  return {
    sut,
    field,
  }
}

describe('CompareFieldsValidation', () => {
  test('should return error if compare is invalid', () => {
    const fieldToCompare = faker.database.column()
    const { sut, field } = makeSut(fieldToCompare)
    const error = sut.validate({
      [field]: faker.random.words(3),
      [fieldToCompare]: faker.random.words(4),
    })
    expect(error).toEqual(new InvalidFieldError(field))
  })
  test('should return falsy if compare is valid', () => {
    const fieldToCompare = faker.database.column()
    const { sut, field } = makeSut(fieldToCompare)
    const value = faker.random.word()
    const error = sut.validate({ [field]: value, [fieldToCompare]: value })
    expect(error).toBeFalsy()
  })
})
