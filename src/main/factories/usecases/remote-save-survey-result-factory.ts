import { SaveSurveyResult } from '@/domain/usecases'
import { RemoteSaveSurveyResult } from '@/data/usecases'
import { makeAuthorizeHttpClientDecorator, makeApiUrl } from '@/main/factories'

export const makeRemoteSaveSurveyResult = (id: string): SaveSurveyResult =>
  new RemoteSaveSurveyResult(
    makeApiUrl(`/surveys/${id}/results`),
    makeAuthorizeHttpClientDecorator<RemoteSaveSurveyResult.Client>(),
  )
