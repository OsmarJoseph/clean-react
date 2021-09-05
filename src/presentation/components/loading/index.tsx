import './styles.scss'
import { Spinner } from '@/presentation/components'

import React from 'react'

export const Loading = (): JSX.Element => {
  return (
    <div className="c-loading" data-testid="loading">
      <div className="c-loading__element">
        <span className="c-loading__element-text">Aguarde ...</span>
        <Spinner isNegative />
      </div>
    </div>
  )
}
