import { Authentication } from '@/domain/usecases'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'
import { HttpClient, HttpStatusCode } from '@/data/protocols'

export class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteAuthentication.Client>,
  ) {}

  async auth({ email, password }: Authentication.Params): Promise<Authentication.Result> {
    const { httpClient, url } = this
    const httpResponse = await httpClient.request({
      url,
      method: 'post',
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

export namespace RemoteAuthentication {
  export type Client = {
    request: {
      body: Authentication.Params
    }
    response: {
      body: Authentication.Result
    }
  } & HttpClient.Constructor
}
