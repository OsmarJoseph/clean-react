import { HttpPostClient, HttpResponse, HttpStatusCode } from '@/data/protocols'

import { mockObject } from '@/tests/helpers/fakes'

import faker from 'faker'

export const mockRequestParams = (): HttpPostClient.Params<{ body: object }> => ({
  url: faker.internet.url(),
  body: mockObject(),
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
