import { HttpPostClient, HttpResponse, HttpStatusCode } from '@/data/protocols'

export class HttpPostClientSpy<Constructor extends HttpPostClient.Constructor> implements HttpPostClient<Constructor> {
  params: HttpPostClient.Params<Constructor['request']>
  response: HttpResponse<Constructor['response']> = {
    statusCode: HttpStatusCode.unauthorized,
    body: { }
  }

  async post (params: HttpPostClient.Params<Constructor['request']>): Promise<HttpResponse<Constructor['response']>> {
    this.params = params
    return this.response
  }
}
