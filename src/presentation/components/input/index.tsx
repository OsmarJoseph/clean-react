import styles from './styles.scss'

import React from 'react'

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

export const Input = (props: Props): JSX.Element => {
  return (
    <div className={styles.inputWrap}>
      <input {...props} />
      <span className={styles.status}>🔴</span>
    </div>
  )
}
