import { HttpPostClient } from '@/data/protocols'

export class HttpPostClientSpy<Constructor extends HttpPostClient.Constructor> implements HttpPostClient<Constructor> {
  params: HttpPostClient.Params<Constructor['ParamTypes']>
  async post (params: HttpPostClient.Params<Constructor['ParamTypes']>): Promise<void> {
    this.params = params
  }
}
