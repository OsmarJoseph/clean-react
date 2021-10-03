import { surveyResultInitialState } from '@/presentation/store/context'
import { mockSurveyResultModel } from '@/tests/_domain'

import faker from 'faker'

describe('SurveysResultReducer', () => {
  test('should return correct initial state values', () => {
    expect(surveyResultInitialState.setError(new Error())).toBeNull()
    expect(surveyResultInitialState.setReload(faker.datatype.boolean())).toBeNull()
    expect(surveyResultInitialState.onAnswer(faker.random.word())).toBeNull()
    expect(surveyResultInitialState.setIsLoading(faker.datatype.boolean())).toBeNull()
    expect(surveyResultInitialState.setSurveyResult(mockSurveyResultModel())).toBeNull()
    expect(surveyResultInitialState.setOnAnswer(jest.fn())).toBeNull()
  })
})
