import { mockSurveyList, mockSurveyResultModel } from '@/tests/_domain'
import { mockServerErrorRequest, mockForbiddenRequest, mockOkRequest } from '@/tests/cypress'
import { SurveyModel, SurveyResult } from '@/domain/models'

const path = /\/api\/surveys/

export const mockUnexpectedError = (): void => mockServerErrorRequest('GET', path)

export const mockAccessDeniedError = (): void => mockForbiddenRequest('GET', path)

export const mockSuccessListRequest = (surveys: SurveyModel[] = mockSurveyList()): void =>
  mockOkRequest('GET', path, surveys)

export const mockSuccessResultRequest = (
  surveyResult: SurveyResult = mockSurveyResultModel(),
): void => mockOkRequest('GET', path, surveyResult)
