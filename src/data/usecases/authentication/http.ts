import { Authentication } from '@/domain/usecases'

export type AuthenticationHttpPostClient = {
  request: { body: Authentication.Params }
  response: { body: Authentication.Result }
}
