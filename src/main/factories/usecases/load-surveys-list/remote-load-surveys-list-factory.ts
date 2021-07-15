import { LoadSurveysList } from '@/domain/usecases'
import { LoadSurveysListHttpGetClient, RemoteLoadSurveysList } from '@/data/usecases'
import { makeAuthorizeHttpGetClientDecorator, makeApiUrl } from '@/main/factories'

export const makeRemoteLoadSurveysList = (): LoadSurveysList =>
  new RemoteLoadSurveysList(
    makeApiUrl('/surveys'),
    makeAuthorizeHttpGetClientDecorator<LoadSurveysListHttpGetClient>(),
  )
