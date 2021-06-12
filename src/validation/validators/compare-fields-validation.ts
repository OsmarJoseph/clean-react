import { FieldValidation } from '@/validation/protocols'
import { InvalidFieldError } from '@/validation/errors'

export class CompareFieldsValidation implements FieldValidation {
  constructor(readonly field: string, readonly fieldToCompare: string) {}

  validate(input: { [key: string]: string }): Error {
    return input[this.field] === input[this.fieldToCompare]
      ? null
      : new InvalidFieldError(this.field)
  }
}
