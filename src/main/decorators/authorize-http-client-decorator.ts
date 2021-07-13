import { AccountModel } from '@/domain/models'
import { GetStorage, HttpGetClient, HttpResponse } from '@/data/protocols'
import { accessTokenHeader, accountKey } from '@/main/constants'

type Constructor = {
  response: { body: string }
}

export class AuthorizeHttpGetClientDecorator implements HttpGetClient<Constructor> {
  constructor(
    private readonly getStorage: GetStorage,
    private readonly httpGetClient: HttpGetClient<Constructor>,
  ) {}

  async get(params: HttpGetClient.Params): Promise<HttpResponse<Constructor['response']>> {
    const account: AccountModel = this.getStorage.get(accountKey)
    if (account?.accessToken) {
      params.headers = { ...params.headers, [accessTokenHeader]: account.accessToken }
    }
    return await this.httpGetClient.get(params)
  }
}
