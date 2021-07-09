import { formInitialState } from '@/presentation/store/context'

import faker from 'faker'

describe('FormReducer', () => {
  test('should return correct initial state values', () => {
    expect(formInitialState.setIsLoading(false)).toBe(false)
    const errorMessage = faker.random.words()
    expect(formInitialState.setErrorMessage(errorMessage)).toBe(errorMessage)
    const inputValues = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      passwordConfirmation: faker.internet.password(),
    }
    expect(formInitialState.setInputValues(inputValues)).toEqual(inputValues)
    expect(formInitialState.setInputErrors(inputValues)).toEqual(inputValues)
    const isFormValid = faker.datatype.boolean()
    expect(formInitialState.setIsFormValid(isFormValid)).toEqual(isFormValid)
  })
})
