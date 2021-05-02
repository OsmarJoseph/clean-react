import styles from './styles.scss'

import React from 'react'

type Props = React.HTMLAttributes<HTMLElement>

export const Spinner = (props: Props): JSX.Element => {
  return (
    <div {...props} data-testid="spinner" className={[props.className, styles.spinner].join(' ')}>
      <div />
      <div />
      <div />
      <div />
    </div>
  )
}
