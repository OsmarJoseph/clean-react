import { LoadSurveysList } from '@/domain/usecases'
import { HttpGetClient } from '@/data/protocols'
import { LoadSurveysListHttpGetClient } from '@/data/usecases'

export class RemoteLoadSurveysList implements LoadSurveysList {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<LoadSurveysListHttpGetClient>,
  ) {}

  async loadAll(): Promise<LoadSurveysList.Result> {
    const { httpGetClient, url } = this
    await httpGetClient.get({ url })
    return null
  }
}
