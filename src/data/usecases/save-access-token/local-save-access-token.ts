import { SaveAccessToken } from '@/domain/usecases'
import { SetStorage } from '@/data/protocols'

export class LocalSaveAccessToken implements SaveAccessToken {
  constructor(private readonly setStorage: SetStorage) {}

  async save(accessToken: string): Promise<void> {
    this.setStorage.set('accessToken', accessToken)
  }
}
