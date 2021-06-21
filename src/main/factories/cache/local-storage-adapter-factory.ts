import { SetStorage } from '@/data/protocols'
import { LocalStorageAdapter } from '@/infra/cache'

export const makeLocalStorageAdapter = (): SetStorage => {
  return new LocalStorageAdapter()
}
