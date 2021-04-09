import { Authentication } from '@/domain/usecases'
import { HttpPostClient, HttpStatusCode } from '@/data/protocols'
import { AuthenticationHttpPostClient } from '@/data/usecases'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'

export class RemoteAuthentication implements Authentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AuthenticationHttpPostClient>
  ) {}

  async auth ({ email, password }: Authentication.Params): Promise<Authentication.Result> {
    const { httpPostClient, url } = this
    const httpPesponse = await httpPostClient.post({ url, body: { email, password } })
    switch (httpPesponse.statusCode) {
      case HttpStatusCode.ok: return httpPesponse.body
      case HttpStatusCode.unauthorized: throw new InvalidCredentialsError()
      default: throw new UnexpectedError()
    }
  }
}
