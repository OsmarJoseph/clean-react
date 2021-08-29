import './styles.scss'

import React from 'react'

type Props = { isNegative?: boolean; className?: string }

export const Spinner = (props: Props): JSX.Element => {
  const { isNegative, className } = props
  const negativeClass = isNegative ? 'spinner--negative' : ''
  return (
    <div data-testid="spinner" className={[className, 'spinner', negativeClass].join(' ')}>
      <div />
      <div />
      <div />
      <div />
    </div>
  )
}
