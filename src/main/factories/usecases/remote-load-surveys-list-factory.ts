import { LoadSurveysList } from '@/domain/usecases'
import { RemoteLoadSurveysList } from '@/data/usecases'
import { makeAuthorizeHttpClientDecorator, makeApiUrl } from '@/main/factories'

export const makeRemoteLoadSurveysList = (): LoadSurveysList =>
  new RemoteLoadSurveysList(
    makeApiUrl('/surveys'),
    makeAuthorizeHttpClientDecorator<RemoteLoadSurveysList.Client>(),
  )
