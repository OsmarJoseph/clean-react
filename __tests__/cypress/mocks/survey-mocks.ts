import { SurveyModel, SurveyResult } from '@/domain/models'

import { mockSurveyList, mockSurveyResultModel } from '@/tests/_domain'
import { mockServerErrorRequest, mockForbiddenRequest, mockOkRequest } from '@/tests/cypress'

import { Method } from 'axios'

const path = /\/api\/surveys/

export const mockGetUnexpectedError = (): void => mockServerErrorRequest('GET', path)

export const mockPutUnexpectedError = (): void => mockServerErrorRequest('PUT', path)

export const mockGetAccessDeniedError = (): void => mockForbiddenRequest('GET', path)

export const mockPutAccessDeniedError = (): void => mockForbiddenRequest('PUT', path)

export const mockSuccessListRequest = (surveys: SurveyModel[] = mockSurveyList()): void =>
  mockOkRequest('GET', path, surveys)

export const mockBaseSuccessResultRequest = (
  method: Method,
  surveyResult: SurveyResult = mockSurveyResultModel(),
): void => mockOkRequest(method, path, surveyResult)

export const mockPutSuccessResultRequest = (surveyResult?: SurveyResult): void =>
  mockBaseSuccessResultRequest('PUT', surveyResult)

export const mockGetSuccessResultRequest = (surveyResult?: SurveyResult): void =>
  mockBaseSuccessResultRequest('GET', surveyResult)
