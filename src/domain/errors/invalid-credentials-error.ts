export class InvalidCredentialsError extends Error {
  static message = 'You are using invalid credentials.'
  constructor() {
    super(InvalidCredentialsError.message)
    this.name = 'InvalidCredentialsError'
  }
}
