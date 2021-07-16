import { AddAccount } from '@/domain/usecases'
import { RemoteAddAccount } from '@/data/usecases'
import { makeAxiosHttpPostClient, makeApiUrl } from '@/main/factories'

export const makeRemoteAddAccount = (): AddAccount =>
  new RemoteAddAccount(makeApiUrl('/signup'), makeAxiosHttpPostClient<RemoteAddAccount.Client>())
