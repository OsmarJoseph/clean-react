import { makeAxiosHttpClient, makeApiUrl } from '@/main/factories'
import { AuthenticationHttpPostClient, RemoteAuthentication } from '@/data/usecases'

export const makeRemoteAuthentication = (): RemoteAuthentication =>
  new RemoteAuthentication(
    makeApiUrl('/login'),
    makeAxiosHttpClient<AuthenticationHttpPostClient>(),
  )
