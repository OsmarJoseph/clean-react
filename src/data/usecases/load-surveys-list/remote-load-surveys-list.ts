import { UnexpectedError } from '@/domain/errors'
import { LoadSurveysList } from '@/domain/usecases'
import { HttpGetClient, HttpStatusCode } from '@/data/protocols'
import { SurveyModel } from '@/domain/models'

export class RemoteLoadSurveysList implements LoadSurveysList {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<RemoteLoadSurveysList.Client>,
  ) {}

  async loadAll(): Promise<LoadSurveysList.Result> {
    const { httpGetClient, url } = this
    const httpResponse = await httpGetClient.get({ url })
    const remoteSurveys = this.mapSurveys(httpResponse.body)
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return remoteSurveys
      case HttpStatusCode.noContent:
        return []
      default:
        throw new UnexpectedError()
    }
  }

  private readonly mapSurveys = (
    surveys: RemoteLoadSurveysList.ClientModel[],
  ): LoadSurveysList.Result => {
    if (Array.isArray(surveys)) return surveys.map(this.adaptDates)
  }

  private readonly adaptDates = (survey: RemoteLoadSurveysList.ClientModel): SurveyModel => {
    return {
      ...survey,
      date: this.adaptDate(survey.date),
    }
  }

  private readonly adaptDate = (dateString: string): Date => {
    return new Date(dateString)
  }
}

export namespace RemoteLoadSurveysList {
  export type Client = ClientResponse
  export type ClientResponse = {
    response: {
      body: ClientModel[]
    }
  }
  export type ClientModel = {
    id: string
    question: string
    answers: [{ image?: string; answer: string }]
    date: string
    didAnswer: boolean
  }
}
