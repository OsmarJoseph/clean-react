import styles from './styles.scss'
import {Spinner} from '@/presentation/components'

import React from 'react'

export const FormStatus = (): JSX.Element => {
  return (
    <div className={styles.errorWrap}>
      <Spinner className={styles.spinner} />
      <span className={styles.error}>Erro</span>
    </div>
  )
}
