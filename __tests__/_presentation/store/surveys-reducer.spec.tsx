import { surveysInitialState } from '@/presentation/store/context'

import { mockSurveyList } from '@/tests/_domain'

import faker from 'faker'

describe('SurveysReducer', () => {
  test('should return correct initial state values', () => {
    expect(surveysInitialState.setError(new Error())).toBeNull()
    expect(surveysInitialState.setReload(faker.datatype.boolean())).toBeNull()
    expect(surveysInitialState.setSurveys(mockSurveyList())).toBeNull()
  })
})
