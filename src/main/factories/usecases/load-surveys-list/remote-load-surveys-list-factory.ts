import { LoadSurveysList } from '@/domain/usecases'
import { RemoteLoadSurveysList } from '@/data/usecases'
import { makeAuthorizeHttpGetClientDecorator, makeApiUrl } from '@/main/factories'

export const makeRemoteLoadSurveysList = (): LoadSurveysList =>
  new RemoteLoadSurveysList(
    makeApiUrl('/surveys'),
    makeAuthorizeHttpGetClientDecorator<RemoteLoadSurveysList.Client>(),
  )
