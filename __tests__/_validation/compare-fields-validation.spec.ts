import { CompareFieldsValidation } from '@/validation/validators'
import { InvalidFieldError } from '@/validation/errors'

import faker from 'faker'

type SutTypes = {
  sut: CompareFieldsValidation
  field: string
}

const makeSut = (fieldToCompare: string): SutTypes => {
  const field = 'first_field'

  const sut = new CompareFieldsValidation(field, fieldToCompare)
  return {
    sut,
    field,
  }
}

describe('CompareFieldsValidation', () => {
  test('should return error if compare is invalid', () => {
    const fieldToCompare = 'second_field'
    const { sut, field } = makeSut(fieldToCompare)
    const error = sut.validate({
      [field]: 'any_value',
      [fieldToCompare]: 'other_value',
    })
    expect(error).toEqual(new InvalidFieldError(field))
  })
  test('should return falsy if compare is valid', () => {
    const fieldToCompare = 'second_field'
    const { sut, field } = makeSut(fieldToCompare)
    const value = faker.random.word()
    const error = sut.validate({ [field]: value, [fieldToCompare]: value })
    expect(error).toBeFalsy()
  })
})
