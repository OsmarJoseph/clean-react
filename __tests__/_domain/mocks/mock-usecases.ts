import { Authentication, AddAccount } from '@/domain/usecases'

import { mockAccountModel } from '@/tests/_domain/mocks'

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

export class AddAccountSpy implements AddAccount {
  params: AddAccount.Params
  callsCount = 0
  result: AddAccount.Result = mockAccountModel()

  async add(params: AddAccount.Params): Promise<Authentication.Result> {
    this.callsCount++
    this.params = params
    return this.result
  }
}
