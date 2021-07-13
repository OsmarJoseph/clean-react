import { GetStorage, HttpGetClient, HttpResponse } from '@/data/protocols'
import { AccountModel } from '@/domain/models'

type Constructor = {
  response: { body: string }
}

export class AuthorizeHttpGetClientDecorator implements HttpGetClient<Constructor> {
  constructor(
    private readonly getStorage: GetStorage,
    private readonly httpGetClient: HttpGetClient<Constructor>,
  ) {}

  async get(params: HttpGetClient.Params): Promise<HttpResponse<Constructor['response']>> {
    const account: AccountModel = this.getStorage.get('account')
    if (account?.accessToken) {
      params.headers = { ...params.headers, 'x-access-token': account.accessToken }
    }
    return await this.httpGetClient.get(params)
  }
}
