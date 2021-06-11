import { RenderResult } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import faker from 'faker'

export const testChildCount = (sut: RenderResult, fieldName: string, count: number): void => {
  const container = sut.getByTestId(fieldName)
  expect(container.childElementCount).toBe(count)
}

export const testButtonIsDisabled = (
  sut: RenderResult,
  testId: string,
  isDisabled: boolean,
): void => {
  const button = sut.getByTestId(testId) as HTMLButtonElement
  if (isDisabled) {
    expect(button).toBeDisabled()
  } else {
    expect(button).not.toBeDisabled()
  }
}

export const testStatusForField = (
  sut: RenderResult,
  fieldName: string,
  validationError?: string,
): void => {
  const fieldStatus = sut.getByTestId(`${fieldName}-status`)
  expect(fieldStatus).toHaveAttribute('title', validationError || 'Tudo certo!')
  expect(fieldStatus).toHaveTextContent(validationError ? '🔴' : '🟢')
}

export const populateField = (
  sut: RenderResult,
  fieldName: string,
  value = faker.random.word(),
): void => {
  const input = sut.getByTestId(fieldName)
  userEvent.clear(input)
  userEvent.type(input, value)
}

export const testElementExists = (sut: RenderResult, testId: string): void => {
  const element = sut.getByTestId(testId)
  expect(element).toBeInTheDocument()
}

export const testElementText = (sut: RenderResult, testId: string, text: string): void => {
  const element = sut.getByTestId(testId)
  expect(element).toHaveTextContent(text)
}
