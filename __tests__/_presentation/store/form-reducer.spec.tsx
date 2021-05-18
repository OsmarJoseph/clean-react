import { initialState } from '@/presentation/store/context'

import faker from 'faker'

describe('FormReducer', () => {
  test('should return correct initial state values', () => {
    expect(initialState.setIsLoading(false)).toBe(false)
    const errorMessage = faker.random.words()
    expect(initialState.setErrorMessage(errorMessage)).toBe(errorMessage)
    const inputValues = { email: faker.internet.email(), password: faker.internet.password() }
    expect(initialState.setInputValues(inputValues)).toEqual(inputValues)
    const inputErrors = { email: faker.random.words(), password: faker.random.words() }
    expect(initialState.setInputErrors(inputErrors)).toEqual(inputErrors)
  })
})
