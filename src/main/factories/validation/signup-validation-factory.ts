import { Validation } from '@/presentation/protocols'
import { ValidationBuilder } from '@/validation/builders'
import { ValidationComposite } from '@/validation/validators'

export const makeSignUpValidation = (): Validation => {
  return ValidationComposite.build([
    ...ValidationBuilder.field('name').required().min(3).build(),
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().min(5).build(),
    ...ValidationBuilder.field('passwordConfirmation').required().sameAs('password').build(),
  ])
}
