import { Authentication } from '@/domain/usecases'
import { RemoteAuthentication } from '@/data/usecases'
import { makeAxiosHttpPostClient, makeApiUrl } from '@/main/factories'

export const makeRemoteAuthentication = (): Authentication =>
  new RemoteAuthentication(
    makeApiUrl('/login'),
    makeAxiosHttpPostClient<RemoteAuthentication.Client>(),
  )
