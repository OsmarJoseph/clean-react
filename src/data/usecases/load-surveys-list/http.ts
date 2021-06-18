import { LoadSurveysList } from '@/domain/usecases'

export type LoadSurveysListHttpGetClient = {
  response: { body: LoadSurveysList.Result }
}
