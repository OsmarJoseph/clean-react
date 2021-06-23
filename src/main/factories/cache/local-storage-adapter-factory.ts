import { GetStorage, SetStorage } from '@/data/protocols'
import { LocalStorageAdapter } from '@/infra/cache'

export const makeLocalStorageAdapter = (): SetStorage & GetStorage => {
  return new LocalStorageAdapter()
}
