import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import faker from 'faker'

export const testStatusForField = (fieldName: string, validationError: string = ''): void => {
  const fieldWrap = screen.getByTestId(`${fieldName}-wrap`)
  const field = screen.getByTestId(`${fieldName}`)
  const fieldLabel = screen.getByTestId(`${fieldName}-label`)
  expect(fieldWrap).toHaveAttribute('data-status', validationError ? 'invalid' : 'valid')
  expect(field).toHaveProperty('title', validationError)
  expect(fieldLabel).toHaveProperty('title', validationError)
}

export const populateField = (fieldName: string, value = faker.random.word()): void => {
  const input = screen.getByTestId(fieldName)
  userEvent.clear(input)
  userEvent.type(input, value)
}
