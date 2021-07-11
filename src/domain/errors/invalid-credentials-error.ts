export class InvalidCredentialsError extends Error {
  static message = 'Você está usando credenciais invalidas.'
  constructor() {
    super(InvalidCredentialsError.message)
    this.name = 'InvalidCredentialsError'
  }
}
