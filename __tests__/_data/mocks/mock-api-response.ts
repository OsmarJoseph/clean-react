import { RemoteLoadSurveysList } from '@/data/usecases'

import faker from 'faker'

export const mockRemoteLoadSurveysListClientModel = (): RemoteLoadSurveysList.ClientModel => ({
  id: faker.datatype.uuid(),
  question: faker.random.words(),
  answers: [{ image: faker.image.imageUrl(), answer: faker.random.word() }],
  date: faker.date.recent().toISOString(),
  didAnswer: faker.datatype.boolean(),
})

export const mockRemoteLoadSurveysListClientModelList = (): RemoteLoadSurveysList.ClientModel[] => [
  mockRemoteLoadSurveysListClientModel(),
  mockRemoteLoadSurveysListClientModel(),
]
