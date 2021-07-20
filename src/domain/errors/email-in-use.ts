export class EmailInUseError extends Error {
  static message = 'Você está usando email que já existe.'
  constructor() {
    super(EmailInUseError.message)
    this.name = 'EmailInUseError'
  }
}
