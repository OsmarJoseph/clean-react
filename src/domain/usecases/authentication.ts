import { AccountModel } from '@/domain/models'

export interface Authentication {
  auth: (params: Authentication.Params) => Authentication.Result
}

export namespace Authentication {
  export type Params = {
    email: string
    password: string
  }
  export type Result = AccountModel
}
