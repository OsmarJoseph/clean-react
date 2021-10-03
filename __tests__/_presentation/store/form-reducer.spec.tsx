import { formInitialState, FormInputs } from '@/presentation/store/context'

import faker from 'faker'

describe('FormReducer', () => {
  test('should return correct initial state values', () => {
    expect(formInitialState.setIsLoading(faker.datatype.boolean())).toBeNull()
    expect(formInitialState.setErrorMessage(faker.random.words())).toBeNull()
    const inputValues: FormInputs = null
    expect(formInitialState.setInputValues(inputValues)).toBeNull()
    expect(formInitialState.setInputErrors(inputValues)).toBeNull()
    expect(formInitialState.setIsFormValid(faker.datatype.boolean())).toBeNull()
  })
})
