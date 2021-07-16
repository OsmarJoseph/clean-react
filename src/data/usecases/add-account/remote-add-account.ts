import { AddAccount } from '@/domain/usecases'
import { EmailInUseError, UnexpectedError } from '@/domain/errors'
import { HttpPostClient, HttpStatusCode } from '@/data/protocols'

export class RemoteAddAccount implements AddAccount {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<RemoteAddAccount.Client>,
  ) {}

  async add({
    name,
    email,
    password,
    passwordConfirmation,
  }: AddAccount.Params): Promise<AddAccount.Result> {
    const { httpPostClient, url } = this
    const httpPesponse = await httpPostClient.post({
      url,
      body: { name, email, password, passwordConfirmation },
    })

    switch (httpPesponse.statusCode) {
      case HttpStatusCode.ok:
        return httpPesponse.body
      case HttpStatusCode.forbidden:
        throw new EmailInUseError()
      default:
        throw new UnexpectedError()
    }
  }
}
export namespace RemoteAddAccount {
  export type Client = ClientRequest & ClientResponse

  export type ClientRequest = {
    request: {
      body: AddAccount.Params
    }
  }
  export type ClientResponse = {
    response: {
      body: AddAccount.Result
    }
  }
}
