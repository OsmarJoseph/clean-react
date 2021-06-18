import { Input } from '@/presentation/components'

import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

type SutTypes = {
  sut: RenderResult
}

const makeSut = (): SutTypes => {
  const sut = render(<Input name="name" />)
  return { sut }
}
describe('Input', () => {
  test('should focus input on label click', () => {
    const { sut } = makeSut()
    const input = sut.getByTestId('name')
    const label = sut.getByTestId('name-label')

    userEvent.click(label)

    expect(input).toHaveFocus()
  })
})
