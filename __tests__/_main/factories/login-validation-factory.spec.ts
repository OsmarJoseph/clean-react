import { makeLoginValidation } from '@/main/factories'
import { ValidationBuilder } from '@/validation/builders'
import { ValidationComposite } from '@/validation/validators'

describe('LoginValidationFactory', () => {
  test('should make ValidationComposite with correct validations', () => {
    const composite = makeLoginValidation()
    expect(composite).toEqual(
      ValidationComposite.build([
        ...ValidationBuilder.field('email').required().email().build(),
        ...ValidationBuilder.field('password').required().min(5).build(),
      ]),
    )
  })
})
