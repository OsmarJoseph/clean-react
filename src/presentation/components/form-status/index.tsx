import './styles.scss'
import { Spinner } from '@/presentation/components'
import { useFormContext } from '@/presentation/store/context'

import React from 'react'

export const FormStatus = (): JSX.Element => {
  const { isLoading, errorMessage } = useFormContext()
  return (
    <div data-testid="error-wrap" className="errorWrap">
      {isLoading && <Spinner className="spinner" />}
      {errorMessage && (
        <span data-testid="main-error" className="error">
          {errorMessage}
        </span>
      )}
    </div>
  )
}
