import { initialState } from '@/presentation/store/context'

import faker from 'faker'

describe('FormReducer', () => {
  test('should return correct initial state values', () => {
    expect(initialState.setIsLoading(false)).toBe(false)
    const errorMessage = faker.random.words()
    expect(initialState.setErrorMessage(errorMessage)).toBe(errorMessage)
    const inputValues = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      passwordConfirmation: faker.internet.password(),
    }
    expect(initialState.setInputValues(inputValues)).toEqual(inputValues)

    expect(initialState.setInputErrors(inputValues)).toEqual(inputValues)
  })
})
