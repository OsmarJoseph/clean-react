import { HttpStatusCode, HttpClient } from '@/data/protocols'

import { mockObject } from '@/tests/helpers'

import faker from 'faker'

export const mockHttpRequest = (): HttpClient.Request<{
  body: object
  headers: Record<string, string>
}> => ({
  url: faker.internet.url(),
  headers: mockObject(),
  method: faker.random.arrayElement(['get', 'post', 'put', 'delete']),
  body: mockObject(),
})

export class HttpClientSpy<Constructor extends HttpClient.Constructor>
  implements HttpClient<Constructor>
{
  params: HttpClient.Request<Constructor['request']>
  response: HttpClient.Response<Constructor['response']> = {
    statusCode: HttpStatusCode.ok,
    body: {},
  }

  async request(
    params: HttpClient.Request<Constructor['request']>,
  ): Promise<HttpClient.Response<Constructor['response']>> {
    this.params = params
    return this.response
  }
}
