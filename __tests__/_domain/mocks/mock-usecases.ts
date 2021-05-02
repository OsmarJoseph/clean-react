import { Authentication } from '@/domain/usecases'

import { mockAccountModel } from '@/__tests__/_domain/mocks'

export class AuthenticationSpy implements Authentication {
  params: Authentication.Params
  callsCount = 0
  result: Authentication.Result = mockAccountModel()

  async auth(params: Authentication.Params): Promise<Authentication.Result> {
    this.callsCount++
    this.params = params
    return this.result
  }
}
