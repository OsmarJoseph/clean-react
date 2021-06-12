import { MinLengthValidation } from '@/validation/validators'
import { InvalidFieldError } from '@/validation/errors'

import faker from 'faker'

type SutTypes = {
  sut: MinLengthValidation
  field: string
}

const makeSut = (): SutTypes => {
  const field = faker.database.column()
  const sut = new MinLengthValidation(field, 5)
  return {
    sut,
    field,
  }
}

describe('MinLengthValidation', () => {
  test('should return error if is invalid', () => {
    const { sut, field } = makeSut()
    const error = sut.validate({ [field]: faker.random.alphaNumeric(4) })
    expect(error).toEqual(new InvalidFieldError(field))
  })
  test('should return falsy if is valid', () => {
    const { sut, field } = makeSut()
    const error = sut.validate({ [field]: faker.random.alphaNumeric(5) })
    expect(error).toBeFalsy()
  })
})
