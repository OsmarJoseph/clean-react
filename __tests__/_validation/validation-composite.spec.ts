import { ValidationComposite } from '@/validation/validators'
import { FieldValidation } from '@/validation/protocols'

import { FieldValidationSpy } from '@/tests/_validation'

import faker from 'faker'

type SutTypes = {
  sut: ValidationComposite
}

const makeSut = (validators: FieldValidation[]): SutTypes => {
  const sut = ValidationComposite.build(validators)
  return {
    sut,
  }
}

describe('ValidationComposite', () => {
  test('should return error if any validation fails', () => {
    const fieldName = faker.database.column()
    const errorMessage = faker.random.words()
    const fieldValidationSpy = new FieldValidationSpy(fieldName)
    const fieldValidationSpy2 = new FieldValidationSpy(fieldName)

    fieldValidationSpy2.result = new Error(errorMessage)

    const { sut } = makeSut([fieldValidationSpy, fieldValidationSpy2])

    const error = sut.validate({ [fieldName]: faker.random.word() })

    expect(error).toBe(errorMessage)
  })
  test('should return the first error', () => {
    const fieldName = faker.database.column()
    const errorMessage = faker.random.words()
    const fieldValidationSpy = new FieldValidationSpy(fieldName)
    const fieldValidationSpy2 = new FieldValidationSpy(fieldName)

    fieldValidationSpy.result = new Error(errorMessage)
    fieldValidationSpy2.result = new Error(faker.random.words())

    const { sut } = makeSut([fieldValidationSpy, fieldValidationSpy2])

    const error = sut.validate({ [fieldName]: faker.random.word() })

    expect(error).toBe(errorMessage)
  })
  test('should return null if has no errors', () => {
    const fieldName = faker.database.column()
    const { sut } = makeSut([new FieldValidationSpy(fieldName), new FieldValidationSpy(fieldName)])

    const error = sut.validate({ [fieldName]: faker.random.word() })

    expect(error).toBeFalsy()
  })
})
