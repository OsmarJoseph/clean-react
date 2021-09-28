import { HttpClient } from '@/data/protocols'

import axios, { AxiosResponse } from 'axios'

export class AxiosHttpClient<Constructor extends HttpClient.Constructor>
  implements HttpClient<Constructor> {
  async request({
    url,
    body,
    method,
    headers,
  }: HttpClient.Request<Constructor['request']>): Promise<
    HttpClient.Response<Constructor['response']>
  > {
    let axiosResponse: AxiosResponse

    try {
      axiosResponse = await axios.request({
        url,
        data: body,
        method,
        headers,
      })
    } catch (error) {
      axiosResponse = error.response
    }
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    }
  }
}
