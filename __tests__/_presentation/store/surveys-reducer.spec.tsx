import { surveysInitialState } from '@/presentation/store/context'

import { mockSurveyList } from '@/tests/_domain/mocks'

import faker from 'faker'

describe('SurveysReducer', () => {
  test('should return correct initial state values', () => {
    expect(surveysInitialState.setError(new Error())).toEqual(new Error())
    const reloadValue = faker.datatype.boolean()
    expect(surveysInitialState.setReload(reloadValue)).toBe(reloadValue)
    const surveys = mockSurveyList()
    expect(surveysInitialState.setSurveys(surveys)).toEqual(surveys)
  })
})
