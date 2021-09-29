import { LoadSurveyResult } from '@/domain/usecases'
import { RemoteLoadSurveyResult } from '@/data/usecases'
import { makeAuthorizeHttpClientDecorator, makeApiUrl } from '@/main/factories'

export const makeRemoteLoadSurveyResult = (id: string): LoadSurveyResult =>
  new RemoteLoadSurveyResult(
    makeApiUrl(`/surveys/${id}/results`),
    makeAuthorizeHttpClientDecorator<RemoteLoadSurveyResult.Client>(),
  )
