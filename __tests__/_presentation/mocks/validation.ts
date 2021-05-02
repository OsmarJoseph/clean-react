import { Validation } from '@/presentation/protocols'

export class ValidationStub implements Validation {
  params: Validation.Params
  result: Validation.Result

  validate(params: Validation.Params): Validation.Result {
    this.params = params
    return this.result
  }
}
