import { SaveCurrentAccount } from '@/domain/usecases'

export class SaveCurrentAccountMock implements SaveCurrentAccount {
  account: SaveCurrentAccount.Params
  async save(account: SaveCurrentAccount.Params): Promise<void> {
    this.account = account
  }
}
