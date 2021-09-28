import { SaveSurveyResult } from '@/domain/usecases'
import { RemoteSurveyResultModel } from '@/data/models'
import { HttpClient, HttpStatusCode } from '@/data/protocols'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'

export class RemoteSaveSurveyResult implements SaveSurveyResult {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteSaveSurveyResult.Client>,
  ) {}

  async save({ answer }: SaveSurveyResult.Params): Promise<SaveSurveyResult.Result> {
    const { httpClient, url } = this
    const { statusCode, body } = await httpClient.request({ url, body: { answer }, method: 'put' })
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

export namespace RemoteSaveSurveyResult {
  export type Client = {
    response: {
      body: ClientModel
    }
  } & HttpClient.Constructor
  export type ClientModel = RemoteSurveyResultModel
}
