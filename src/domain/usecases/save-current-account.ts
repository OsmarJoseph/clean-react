import { AccountModel } from '@/domain/models'

export interface SaveCurrentAccount {
  save: (accessToken: SaveCurrentAccount.Params) => Promise<void>
}

export namespace SaveCurrentAccount {
  export type Params = AccountModel
}
