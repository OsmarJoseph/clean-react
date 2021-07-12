import { GetStorage, HttpGetClient, HttpResponse } from '@/data/protocols'

type Constructor = {
  response: { body: string }
}

export class AuthorizeHttpGetClientDecorator implements HttpGetClient<Constructor> {
  constructor(
    private readonly getStorage: GetStorage,
    private readonly httpGetClient: HttpGetClient<Constructor>,
  ) {}

  async get(params: HttpGetClient.Params): Promise<HttpResponse<Constructor['response']>> {
    this.getStorage.get('account')

    return await this.httpGetClient.get(params)
  }
}
