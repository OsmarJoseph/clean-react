import { Validation } from '@/presentation/protocols'
import { ValidationBuilder } from '@/validation/builders'
import { ValidationComposite } from '@/validation/validators'

export const makeLoginValidation = (): Validation => {
  return ValidationComposite.build([
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().min(5).build(),
  ])
}
