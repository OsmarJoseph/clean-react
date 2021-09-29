import { AddAccount } from '@/domain/usecases'
import { RemoteAddAccount } from '@/data/usecases'
import { makeAxiosHttpClient, makeApiUrl } from '@/main/factories'

export const makeRemoteAddAccount = (): AddAccount =>
  new RemoteAddAccount(makeApiUrl('/signup'), makeAxiosHttpClient<RemoteAddAccount.Client>())
