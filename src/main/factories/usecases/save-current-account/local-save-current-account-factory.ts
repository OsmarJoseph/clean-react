import { SaveCurrentAccount } from '@/domain/usecases'
import { LocalSaveCurrentAccount } from '@/data/usecases'
import { makeSetStorage } from '@/main/factories'

export const makeSaveCurrentAccount = (): SaveCurrentAccount => {
  return new LocalSaveCurrentAccount(makeSetStorage())
}
