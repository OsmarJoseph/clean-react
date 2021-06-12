import { EmailValidation } from '@/validation/validators'
import { InvalidFieldError } from '@/validation/errors'

import faker from 'faker'

type SutTypes = {
  sut: EmailValidation
  field: string
}

const makeSut = (): SutTypes => {
  const field = faker.database.column()
  const sut = new EmailValidation(field)
  return {
    sut,
    field,
  }
}

describe('EmailValidation', () => {
  test('should return error if email is invalid', () => {
    const { sut, field } = makeSut()
    const error = sut.validate({ [field]: faker.random.word() })
    expect(error).toEqual(new InvalidFieldError(field))
  })
  test('should return falsy if email is valid', () => {
    const { sut, field } = makeSut()
    const error = sut.validate({ [field]: faker.internet.email() })
    expect(error).toBeFalsy()
  })
})
