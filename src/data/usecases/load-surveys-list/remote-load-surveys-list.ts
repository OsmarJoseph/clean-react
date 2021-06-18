import { UnexpectedError } from '@/domain/errors'
import { LoadSurveysList } from '@/domain/usecases'
import { HttpGetClient, HttpStatusCode } from '@/data/protocols'
import { LoadSurveysListHttpGetClient } from '@/data/usecases'

export class RemoteLoadSurveysList implements LoadSurveysList {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<LoadSurveysListHttpGetClient>,
  ) {}

  async loadAll(): Promise<LoadSurveysList.Result> {
    const { httpGetClient, url } = this
    const httpResponse = await httpGetClient.get({ url })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body
      case HttpStatusCode.noContent:
        return []
      default:
        throw new UnexpectedError()
    }
  }
}
