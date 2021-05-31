import { SetStorage } from '@/data/protocols'
import { LocalStorageAdapter } from '@/infra/cache'

export const makeSetStorage = (): SetStorage => {
  return new LocalStorageAdapter()
}
