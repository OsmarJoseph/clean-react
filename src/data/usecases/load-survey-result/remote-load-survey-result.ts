import { LoadSurveyResult } from '@/domain/usecases'
import { HttpGetClient, HttpStatusCode } from '@/data/protocols'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'

export class RemoteLoadSurveyResult implements LoadSurveyResult {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<RemoteLoadSurveyResult.Client>,
  ) {}

  async load(): Promise<LoadSurveyResult.Result> {
    const { httpGetClient, url } = this
    const { statusCode, body } = await httpGetClient.get({ url })
    switch (statusCode) {
      case HttpStatusCode.ok:
        return { ...body, date: this.adaptDate(body.date) }
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError()
      default:
        throw new UnexpectedError()
    }
  }

  private readonly adaptDate = (dateString: string): Date => {
    return new Date(dateString)
  }
}

export namespace RemoteLoadSurveyResult {
  export type Client = ClientResponse
  export type ClientResponse = {
    response: {
      body: ClientModel
    }
  }
  export type ClientModel = {
    question: string
    answers: Array<{ image?: string; answer: string; count: number; percent: number }>
    date: string
  }
}
