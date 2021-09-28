import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { LoadSurveysList } from '@/domain/usecases'
import { HttpClient, HttpStatusCode } from '@/data/protocols'
import { SurveyModel } from '@/domain/models'

export class RemoteLoadSurveysList implements LoadSurveysList {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteLoadSurveysList.Client>,
  ) {}

  async loadAll(): Promise<LoadSurveysList.Result> {
    const { httpClient, url } = this
    const httpResponse = await httpClient.request({ url, method: 'get' })
    const remoteSurveys = this.mapSurveys(httpResponse.body)

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return remoteSurveys
      case HttpStatusCode.noContent:
        return []
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError()
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
  export type Client = {
    response: {
      body: ClientModel[]
    }
  } & HttpClient.Constructor
  export type ClientModel = {
    id: string
    question: string
    answers: [{ image?: string; answer: string }]
    date: string
    didAnswer: boolean
  }
}
