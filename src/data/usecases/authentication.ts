import { Authentication } from '@/domain/usecases'
import { HttpPostClient } from '@/data/protocols'

export class RemoteAuthentication implements Authentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<{ParamTypes: {Body: Authentication.Params}}>
  ) {}

  async auth ({ email, password }: Authentication.Params): Authentication.Result {
    const { httpPostClient, url } = this
    await httpPostClient.post({ url, body: { email, password } })
    return null
  }
}
