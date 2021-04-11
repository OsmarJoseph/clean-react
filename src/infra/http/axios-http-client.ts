import { HttpPostClient, HttpResponse } from '@/data/protocols'

import axios from 'axios'

export class AxiosHttpClient<Constructor extends HttpPostClient.Constructor> implements HttpPostClient<Constructor> {
  async post ({ url, body }: HttpPostClient.Params<Constructor['request']>): Promise<HttpResponse<Constructor['response']>> {
    await axios.post(url, body)
    return null
  }
}
