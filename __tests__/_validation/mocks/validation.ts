import { FieldValidation } from '@/validation/protocols'

export class FieldValidationSpy implements FieldValidation {
  result: Error = null
  constructor(readonly field: string) {}

  validate(value: string): Error {
    return this.result
  }
}
