import { Authentication } from '@/domain/usecases'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'
import { HttpPostClient, HttpStatusCode } from '@/data/protocols'

export class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<RemoteAuthentication.Client>,
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

export namespace RemoteAuthentication {
  export type Client = ClientRequest & ClientResponse

  export type ClientRequest = {
    request: {
      body: Authentication.Params
    }
  }
  export type ClientResponse = {
    response: {
      body: Authentication.Result
    }
  }
}
