import { SaveAccessToken } from '@/domain/usecases'
import { SetStorage } from '@/data/protocols'
import { UnexpectedError } from '@/domain/errors'

export class LocalSaveAccessToken implements SaveAccessToken {
  constructor(private readonly setStorage: SetStorage) {}

  async save(accessToken: string): Promise<void> {
    if (!accessToken) {
      throw new UnexpectedError()
    }
    this.setStorage.set('accessToken', accessToken)
  }
}
