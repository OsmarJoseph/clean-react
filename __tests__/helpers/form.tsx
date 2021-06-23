import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import faker from 'faker'

export const testChildCount = (fieldName: string, count: number): void => {
  const container = screen.getByTestId(fieldName)
  expect(container.childElementCount).toBe(count)
}

export const testButtonIsDisabled = (testId: string, isDisabled: boolean): void => {
  const button = screen.getByTestId(testId) as HTMLButtonElement
  if (isDisabled) {
    expect(button).toBeDisabled()
  } else {
    expect(button).not.toBeDisabled()
  }
}

export const testStatusForField = (fieldName: string, validationError: string = ''): void => {
  const fieldWrap = screen.getByTestId(`${fieldName}-wrap`)
  const field = screen.getByTestId(`${fieldName}`)
  const fieldLabel = screen.getByTestId(`${fieldName}-label`)
  expect(fieldWrap).toHaveAttribute('data-status', validationError ? 'invalid' : 'valid')
  expect(field.title).toBe(validationError)
  expect(fieldLabel.title).toBe(validationError)
}

export const populateField = (fieldName: string, value = faker.random.word()): void => {
  const input = screen.getByTestId(fieldName)
  userEvent.clear(input)
  userEvent.type(input, value)
}

export const testElementExists = (testId: string): void => {
  const element = screen.getByTestId(testId)
  expect(element).toBeInTheDocument()
}

export const testElementText = (testId: string, text: string): void => {
  const element = screen.getByTestId(testId)
  expect(element).toHaveTextContent(text)
}
