import { FieldValidation } from '@/validation/protocols'
import { InvalidFieldError } from '@/validation/errors'

export class CompareFieldsValidation implements FieldValidation {
  constructor(readonly field: string, readonly valueToCompare: string) {}

  validate(value: string): Error {
    return value !== this.valueToCompare ? new InvalidFieldError(this.field) : null
  }
}
