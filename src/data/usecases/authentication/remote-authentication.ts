import { Authentication } from '@/domain/usecases'
import { HttpPostClient } from '@/data/protocols'
import { AuthenticationHttpPostClient } from '@/data/usecases'

export class RemoteAuthentication implements Authentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AuthenticationHttpPostClient>
  ) {}

  async auth ({ email, password }: Authentication.Params): Authentication.Result {
    const { httpPostClient, url } = this
    await httpPostClient.post({ url, body: { email, password } })
    return null
  }
}
