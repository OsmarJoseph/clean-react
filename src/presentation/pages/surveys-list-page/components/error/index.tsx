import { useSurveysContext } from '@/presentation/store/context'

import React, { useCallback } from 'react'

export const Error = (): JSX.Element => {
  const { error, setSurveys, setError, reload, setReload } = useSurveysContext()

  const handleReloadClick = useCallback(() => {
    setSurveys([])
    setError(undefined)
    setReload(!reload)
  }, [])

  return (
    <div className="c-error-wrap">
      <span data-testid="error">{error.message}</span>
      <button onClick={handleReloadClick} data-testid="reload">
        Recarregar
      </button>
    </div>
  )
}
