import { AddAccountHttpPostClient, RemoteAddAccount } from '@/data/usecases'
import { makeAxiosHttpClient, makeApiUrl } from '@/main/factories'

export const makeRemoteAddAccount = (): RemoteAddAccount =>
  new RemoteAddAccount(makeApiUrl('/signup'), makeAxiosHttpClient<AddAccountHttpPostClient>())
