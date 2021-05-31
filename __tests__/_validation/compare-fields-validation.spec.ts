import { CompareFieldsValidation } from '@/validation/validators'
import { InvalidFieldError } from '@/validation/errors'

import faker from 'faker'

type SutTypes = {
  sut: CompareFieldsValidation
  field: string
}

const makeSut = (valueToCompare: string): SutTypes => {
  const field = faker.database.column()

  const sut = new CompareFieldsValidation(field, valueToCompare)
  return {
    sut,
    field,
  }
}

describe('CompareFieldsValidation', () => {
  test('should return error if compare is invalid', () => {
    const valueToCompare = faker.random.word()
    const { sut, field } = makeSut(valueToCompare)
    const error = sut.validate(faker.random.word())
    expect(error).toEqual(new InvalidFieldError(field))
  })
  test('should return falsy if compare is valid', () => {
    const valueToCompare = faker.random.word()
    const { sut } = makeSut(valueToCompare)
    const error = sut.validate(valueToCompare)
    expect(error).toBeFalsy()
  })
})
