import {
  HttpGetClient,
  HttpPostClient,
  HttpResponse,
  HttpResponseConstructor,
} from '@/data/protocols'

import axios, { AxiosResponse } from 'axios'

export class AxiosHttpPostClient<Constructor extends HttpPostClient.Constructor>
  implements HttpPostClient<Constructor> {
  async post({
    url,
    body,
  }: HttpPostClient.Params<Constructor['request']>): Promise<
    HttpResponse<Constructor['response']>
  > {
    let axiosResponse: AxiosResponse

    try {
      axiosResponse = await axios.post(url, body)
    } catch (error) {
      axiosResponse = error.response
    }
    return adapt(axiosResponse)
  }
}
export class AxiosHttpGetClient<Constructor extends HttpGetClient.Constructor>
  implements HttpGetClient<Constructor> {
  async get({ url }: HttpGetClient.Params): Promise<HttpResponse<Constructor['response']>> {
    let axiosResponse: AxiosResponse

    try {
      axiosResponse = await axios.get(url)
    } catch (error) {
      axiosResponse = error.response
    }
    return adapt(axiosResponse)
  }
}
const adapt = <T extends HttpResponseConstructor>(
  axiosResponse: AxiosResponse,
): HttpResponse<T> => {
  return {
    statusCode: axiosResponse.status,
    body: axiosResponse.data,
  }
}
