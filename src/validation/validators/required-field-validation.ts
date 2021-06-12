import { FieldValidation } from '@/validation/protocols'
import { RequiredFieldError } from '@/validation/errors'

export class RequiredFieldValidation implements FieldValidation {
  constructor(readonly field: string) {}

  validate(input: { [key: string]: string }): Error {
    return input[this.field] ? null : new RequiredFieldError()
  }
}
