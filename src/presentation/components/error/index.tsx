import './styles.scss'

import React from 'react'

type Props = {
  error: Error
  handleReloadClick: () => void
}

export const Error = ({ error, handleReloadClick }: Props): JSX.Element => {
  return (
    <div className="c-error-wrap">
      <span className="c-error-wrap__text" data-testid="error">
        {error.message}
      </span>
      <button onClick={handleReloadClick} data-testid="reload">
        Recarregar
      </button>
    </div>
  )
}
