import { ValidationBuilder as sut } from '@/validation/builders'
import {
  RequiredFieldValidation,
  EmailValidation,
  MinLengthValidation,
  CompareFieldsValidation,
} from '@/validation/validators'

import faker from 'faker'

describe('ValidationBuilder', () => {
  test('should return RequiredFieldValidation', () => {
    const fieldName = faker.database.column()
    const validations = sut.field(fieldName).required().build()
    expect(validations).toEqual([new RequiredFieldValidation(fieldName)])
  })
  test('should return EmailValidation', () => {
    const fieldName = faker.database.column()
    const validations = sut.field(fieldName).email().build()
    expect(validations).toEqual([new EmailValidation(fieldName)])
  })
  test('should return MinLengthValidation', () => {
    const fieldName = faker.database.column()
    const minLength = faker.datatype.number()
    const validations = sut.field(fieldName).min(minLength).build()
    expect(validations).toEqual([new MinLengthValidation(fieldName, minLength)])
  })
  test('should return CompareFieldsValidation', () => {
    const fieldName = faker.database.column()
    const fieldToCompare = faker.database.column()
    const validations = sut.field(fieldName).sameAs(fieldToCompare).build()
    expect(validations).toEqual([new CompareFieldsValidation(fieldName, fieldToCompare)])
  })
  test('should return a list of validations', () => {
    const fieldName = faker.database.column()
    const minLength = faker.datatype.number()
    const validations = sut.field(fieldName).required().email().min(minLength).build()
    expect(validations).toEqual([
      new RequiredFieldValidation(fieldName),
      new EmailValidation(fieldName),
      new MinLengthValidation(fieldName, minLength),
    ])
  })
})
