import { RequiredFieldValidation } from '@/validation/validators'
import { RequiredFieldError } from '@/validation/errors'

type SutTypes = {
  sut: RequiredFieldValidation
}

const makeSut = (): SutTypes => {
  const sut = new RequiredFieldValidation('email')
  return {
    sut,
  }
}

describe('RequiredFieldValidation', () => {
  test('should return error if field is empty', () => {
    const { sut } = makeSut()
    const error = sut.validate('email')
    expect(error).toEqual(new RequiredFieldError())
  })
})
