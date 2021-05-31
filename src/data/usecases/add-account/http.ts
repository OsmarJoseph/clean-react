import { AddAccount } from '@/domain/usecases'

export type AddAccountHttpPostClient = {
  request: { body: AddAccount.Params }
  response: { body: AddAccount.Result }
}
