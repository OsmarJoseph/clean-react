import { Authentication, AddAccount, LoadSurveysList, LoadSurveyResult } from '@/domain/usecases'

import { mockAccountModel, mockSurveyList, mockSurveyResultModel } from '@/tests/_domain'

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

  async add(params: AddAccount.Params): Promise<AddAccount.Result> {
    this.callsCount++
    this.params = params
    return this.result
  }
}

export class LoadSurveysListSpy implements LoadSurveysList {
  callsCount = 0
  result: LoadSurveysList.Result = mockSurveyList()

  async loadAll(): Promise<LoadSurveysList.Result> {
    this.callsCount++
    return this.result
  }
}
export class LoadSurveyResultSpy implements LoadSurveyResult {
  callsCount = 0
  result: LoadSurveyResult.Result = mockSurveyResultModel()

  async load(): Promise<LoadSurveyResult.Result> {
    this.callsCount++
    return this.result
  }
}
