import { HttpGetClient, HttpPostClient, HttpResponse } from '@/data/protocols'

import axios, { AxiosResponse } from 'axios'

export class AxiosHttpClient<
  Constructor extends HttpPostClient.Constructor & HttpGetClient.Constructor
> implements HttpPostClient<Constructor>, HttpGetClient<Constructor> {
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
    return this.adapt(axiosResponse)
  }

  async get({ url }: HttpGetClient.Params): Promise<HttpResponse<Constructor['response']>> {
    let axiosResponse: AxiosResponse

    try {
      axiosResponse = await axios.get(url)
    } catch (error) {
      axiosResponse = error.response
    }
    return this.adapt(axiosResponse)
  }

  private adapt(axiosResponse: AxiosResponse): HttpResponse<Constructor['response']> {
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    }
  }
}
