import { LoadSurveysList } from '@/domain/usecases'
import { LoadSurveysListHttpGetClient, RemoteLoadSurveysList } from '@/data/usecases'
import { makeAxiosHttpGetClient, makeApiUrl } from '@/main/factories'

export const makeRemoteLoadSurveysList = (): LoadSurveysList =>
  new RemoteLoadSurveysList(
    makeApiUrl('/surveys'),
    makeAxiosHttpGetClient<LoadSurveysListHttpGetClient>(),
  )
