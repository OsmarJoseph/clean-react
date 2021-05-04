import { FieldValidation } from '@/validation/protocols'
import { Validation } from '@/presentation/protocols'

export class ValidationComposite implements Validation {
  private constructor(private readonly validators: FieldValidation[]) {}

  static build(validators: FieldValidation[]): ValidationComposite {
    return new ValidationComposite(validators)
  }

  validate([fieldName, fieldValue]: Validation.Params): Validation.Result {
    const validators = this.validators.filter((validator) => validator.field === fieldName)

    for (const validator of validators) {
      const error = validator.validate(fieldValue)
      if (error) return error.message
    }
  }
}
