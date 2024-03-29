import { LoadSurveyResult } from '@/domain/usecases'
import { RemoteSurveyResultModel } from '@/data/models'
import { HttpClient, HttpStatusCode } from '@/data/protocols'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'

export class RemoteLoadSurveyResult implements LoadSurveyResult {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteLoadSurveyResult.Client>,
  ) {}

  async load(): Promise<LoadSurveyResult.Result> {
    const { httpClient, url } = this
    const { statusCode, body } = await httpClient.request({ url, method: 'get' })
    switch (statusCode) {
      case HttpStatusCode.ok:
        return { ...body, date: new Date(body.date) }
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError()
      default:
        throw new UnexpectedError()
    }
  }
}

export namespace RemoteLoadSurveyResult {
  export type Client = {
    response: {
      body: ClientModel
    }
  } & HttpClient.Constructor
  export type ClientModel = RemoteSurveyResultModel
}
