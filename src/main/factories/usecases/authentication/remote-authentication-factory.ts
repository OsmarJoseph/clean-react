import { Authentication } from '@/domain/usecases'
import { RemoteAuthentication } from '@/data/usecases'
import { makeAxiosHttpClient, makeApiUrl } from '@/main/factories'

export const makeRemoteAuthentication = (): Authentication =>
  new RemoteAuthentication(makeApiUrl('/login'), makeAxiosHttpClient<RemoteAuthentication.Client>())
