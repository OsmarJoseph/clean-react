import styles from './styles.scss'
import { Spinner } from '@/presentation/components'
import { useFormContext } from '@/presentation/store/context'

import React from 'react'

export const FormStatus = (): JSX.Element => {
  const { isLoading, errorMessage } = useFormContext()
  return (
    <div data-testid="error-wrap" className={styles.errorWrap}>
      {isLoading && <Spinner className={styles.spinner} />}
      {errorMessage && (
        <span data-testid="main-error" className={styles.error}>
          {errorMessage}
        </span>
      )}
    </div>
  )
}
