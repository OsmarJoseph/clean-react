import { AccountModel, SurveyModel } from '@/domain/models'
import { AddAccount, Authentication } from '@/domain/usecases'

import faker from 'faker'

export const mockAuthenticationParams = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
})

export const mockAddAccountParams = (): AddAccount.Params => {
  const password = faker.internet.password()
  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password,
    passwordConfirmation: password,
  }
}

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.datatype.uuid(),
})

export const mockSurveyModel = (): SurveyModel => ({
  id: faker.datatype.uuid(),
  question: faker.random.words(),
  answers: [{ image: faker.image.imageUrl(), answer: faker.random.word() }],
  date: faker.date.recent(),
  didAnswer: faker.datatype.boolean(),
})

export const mockSurveyList = (): SurveyModel[] => [mockSurveyModel(), mockSurveyModel()]
