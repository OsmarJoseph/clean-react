import { SaveAccessToken } from '@/domain/usecases'
import { LocalSaveAccessToken } from '@/data/usecases'
import { makeSetStorage } from '@/main/factories'

export const makeSaveAccessToken = (): SaveAccessToken => {
  return new LocalSaveAccessToken(makeSetStorage())
}
