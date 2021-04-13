import {LoginPage} from '@/presentation/pages'

import React from 'react'
import {render} from '@testing-library/react'
describe('LoginPage', () => {
  test('should not render spinner and error on start', () => {
    const {getByTestId} = render(<LoginPage />)
    const errorWrap = getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)
  })
})
