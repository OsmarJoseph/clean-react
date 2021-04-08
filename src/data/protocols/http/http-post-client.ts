export interface HttpPostClient<Constructor extends HttpPostClient.Constructor> {
  post: (params: HttpPostClient.Params<Constructor['ParamTypes']>) => Promise<void>
}

export namespace HttpPostClient {
  export type Constructor = {
    ParamTypes: { Body: unknown }
  }
  export type Params<ParamTypes extends HttpPostClient.Constructor['ParamTypes']> = {
    url: string
    body: ParamTypes['Body']
  }
}
