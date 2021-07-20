export class AccessDeniedError extends Error {
  static message = 'Acesso negado.'
  constructor() {
    super(AccessDeniedError.message)
    this.name = 'AccessDeniedError'
    Object.setPrototypeOf(this, AccessDeniedError.prototype)
  }
}
