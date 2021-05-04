import { HttpPostClient, HttpResponse } from '@/data/protocols'

import axios, { AxiosResponse } from 'axios'

export class AxiosHttpClient<Constructor extends HttpPostClient.Constructor>
  implements HttpPostClient<Constructor> {
  async post({
    url,
    body,
  }: HttpPostClient.Params<Constructor['request']>): Promise<
    HttpResponse<Constructor['response']>
  > {
    let httpResponse: AxiosResponse

    try {
      httpResponse = await axios.post(url, body)
    } catch (error) {
      httpResponse = error.response
    }
    return {
      statusCode: httpResponse.status,
      body: httpResponse.data,
    }
  }
}
