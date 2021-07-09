import { Authentication } from '@/domain/usecases'
import { AuthenticationHttpPostClient, RemoteAuthentication } from '@/data/usecases'
import { makeAxiosHttpPostClient, makeApiUrl } from '@/main/factories'

export const makeRemoteAuthentication = (): Authentication =>
  new RemoteAuthentication(
    makeApiUrl('/login'),
    makeAxiosHttpPostClient<AuthenticationHttpPostClient>(),
  )
