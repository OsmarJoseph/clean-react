import { AccountModel } from '@/domain/models'
import { GetStorage, HttpGetClient, HttpResponse } from '@/data/protocols'
import { accessTokenHeader, accountKey } from '@/main/constants'

export class AuthorizeHttpGetClientDecorator<Constructor extends HttpGetClient.Constructor>
  implements HttpGetClient<Constructor> {
  constructor(
    private readonly getStorage: GetStorage,
    private readonly httpGetClient: HttpGetClient<Constructor>,
  ) {}

  async get(params: HttpGetClient.Params): Promise<HttpResponse<Constructor['response']>> {
    const account: AccountModel = this.getStorage.get(accountKey)
    if (account?.accessToken) {
      params.headers = { ...params.headers, [accessTokenHeader]: account.accessToken }
    }
    console.log(params)

    return await this.httpGetClient.get(params)
  }
}
