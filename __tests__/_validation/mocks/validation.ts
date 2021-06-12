import { FieldValidation } from '@/validation/protocols'

export class FieldValidationSpy implements FieldValidation {
  result: Error = null
  constructor(readonly field: string) {}

  validate(input: { [key: string]: string }): Error {
    return this.result
  }
}
