export class UnexpectedError extends Error {
  static message = 'Something wrong happened, try again.'
  constructor () {
    super(UnexpectedError.message)
    this.name = 'UnexpectedError'
  }
}
