export class EmailInUseError extends Error {
  static message = 'You are using an email that already exists'
  constructor() {
    super(EmailInUseError.message)
    this.name = 'EmailInUseError'
  }
}
