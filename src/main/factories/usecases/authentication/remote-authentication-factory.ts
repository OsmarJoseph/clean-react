import { AuthenticationHttpPostClient, RemoteAuthentication } from '@/data/usecases'
import { makeAxiosHttpClient, makeApiUrl } from '@/main/factories'

export const makeRemoteAuthentication = (): RemoteAuthentication =>
  new RemoteAuthentication(
    makeApiUrl('/login'),
    makeAxiosHttpClient<AuthenticationHttpPostClient>(),
  )
