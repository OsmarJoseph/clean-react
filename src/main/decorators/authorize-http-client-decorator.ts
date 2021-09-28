import { AccountModel } from '@/domain/models'
import { GetStorage, HttpClient } from '@/data/protocols'
import { accessTokenHeader, accountKey } from '@/constants'

export class AuthorizeHttpClientDecorator<Constructor extends HttpClient.Constructor>
  implements HttpClient<Constructor> {
  constructor(
    private readonly getStorage: GetStorage,
    private readonly httpClient: HttpClient<Constructor>,
  ) {}

  async request(
    request: HttpClient.Request<Constructor['request']>,
  ): Promise<HttpClient.Response<Constructor['response']>> {
    const account: AccountModel = this.getStorage.get(accountKey)

    if (account?.accessToken) {
      request.headers = { ...request.headers, [accessTokenHeader]: account.accessToken }
    }

    return await this.httpClient.request(request)
  }
}
