export class RequiredFieldError extends Error {
  static message = 'Campo Obrigatório'
  constructor() {
    super(RequiredFieldError.message)
    this.name = 'RequiredFieldError'
  }
}
