import { Authentication } from '@/domain/usecases'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'
import { HttpPostClient, HttpStatusCode } from '@/data/protocols'
import { AuthenticationHttpPostClient } from '@/data/usecases'

export class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AuthenticationHttpPostClient>,
  ) {}

  async auth({ email, password }: Authentication.Params): Promise<Authentication.Result> {
    const { httpPostClient, url } = this
    const httpResponse = await httpPostClient.post({
      url,
      body: { email, password },
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError()
      default:
        throw new UnexpectedError()
    }
  }
}
