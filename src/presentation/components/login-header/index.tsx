import styles from './styles.scss'
import {Logo} from '@/presentation/components'

import React, {memo} from 'react'

const LoginHeaderComponent = (): JSX.Element => {
  return (
    <header className={styles.header}>
      <Logo />
      <h1>4Dev - Enquetes para programadores</h1>
    </header>
  )
}

export const LoginHeader = memo(LoginHeaderComponent)
