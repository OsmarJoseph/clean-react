export class UnexpectedError extends Error {
  static message = 'Algo de errado aconteceu. Tente novamente em breve.'
  constructor() {
    super(UnexpectedError.message)
    this.name = 'UnexpectedError'
  }
}
