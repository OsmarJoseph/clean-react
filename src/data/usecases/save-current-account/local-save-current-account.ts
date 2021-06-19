import { SaveCurrentAccount } from '@/domain/usecases'
import { SetStorage } from '@/data/protocols'
import { UnexpectedError } from '@/domain/errors'

export class LocalSaveCurrentAccount implements SaveCurrentAccount {
  constructor(private readonly setStorage: SetStorage) {}

  async save(account: SaveCurrentAccount.Params): Promise<void> {
    if (!account?.accessToken) {
      throw new UnexpectedError()
    }
    this.setStorage.set('account', JSON.stringify(account))
  }
}
