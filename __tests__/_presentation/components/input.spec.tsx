import { Input } from '@/presentation/components'

import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const makeSut = (): void => {
  render(<Input name="name" />)
}
describe('Input', () => {
  test('should focus input on label click', () => {
    makeSut()
    const input = screen.getByTestId('name')
    const label = screen.getByTestId('name-label')

    userEvent.click(label)

    expect(input).toHaveFocus()
  })
})
