export class InvalidFieldError extends Error {
  static message = (fieldName: string): string => `O campo ${fieldName} é invalido`

  constructor(readonly fieldName: string) {
    super(InvalidFieldError.message(fieldName))
    this.name = 'InvalidFieldError'
  }
}
