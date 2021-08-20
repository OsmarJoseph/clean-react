import { mockSurveyList } from '@/tests/_domain'
import { mockServerErrorRequest, mockForbiddenRequest, mockOkRequest } from '@/tests/cypress'
import { SurveyModel } from '@/domain/models'

const path = '/api/surveys'

export const mockUnexpectedError = (): void => mockServerErrorRequest('GET', path)

export const mockAccessDeniedError = (): void => mockForbiddenRequest('GET', path)

export const mockSuccessRequest = (surveys: SurveyModel[] = mockSurveyList()): void =>
  mockOkRequest('GET', path, surveys)
