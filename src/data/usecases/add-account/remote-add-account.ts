import { AddAccount } from '@/domain/usecases'
import { EmailInUseError, UnexpectedError } from '@/domain/errors'
import { HttpClient, HttpStatusCode } from '@/data/protocols'

export class RemoteAddAccount implements AddAccount {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteAddAccount.Client>,
  ) {}

  async add({
    name,
    email,
    password,
    passwordConfirmation,
  }: AddAccount.Params): Promise<AddAccount.Result> {
    const { httpClient, url } = this
    const httpPesponse = await httpClient.request({
      url,
      method: 'post',
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
  export type Client = {
    request: {
      body: AddAccount.Params
    }

    response: {
      body: AddAccount.Result
    }
  } & HttpClient.Constructor
}
