import { HttpGetClient, HttpPostClient, HttpResponse, HttpStatusCode } from '@/data/protocols'

import { mockObject } from '@/tests/helpers'

import faker from 'faker'

export const mockPostRequestParams = (): HttpPostClient.Params<{ body: object }> => ({
  url: faker.internet.url(),
  body: mockObject(),
})
export const mockGetRequestParams = (): HttpGetClient.Params => ({
  url: faker.internet.url(),
})

export class HttpPostClientSpy<Constructor extends HttpPostClient.Constructor>
  implements HttpPostClient<Constructor> {
  params: HttpPostClient.Params<Constructor['request']>
  response: HttpResponse<Constructor['response']> = {
    statusCode: HttpStatusCode.ok,
    body: {},
  }

  async post(
    params: HttpPostClient.Params<Constructor['request']>,
  ): Promise<HttpResponse<Constructor['response']>> {
    this.params = params
    return this.response
  }
}
export class HttpGetClientSpy<Constructor extends HttpGetClient.Constructor>
  implements HttpGetClient<Constructor> {
  params: HttpGetClient.Params
  response: HttpResponse<Constructor['response']> = {
    statusCode: HttpStatusCode.ok,
    body: {},
  }

  async get(params: HttpGetClient.Params): Promise<HttpResponse<Constructor['response']>> {
    this.params = params
    return this.response
  }
}
