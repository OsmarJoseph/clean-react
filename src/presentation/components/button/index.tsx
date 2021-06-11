import React from 'react'

type Props = {
  children: string
  isDisabled: boolean
}

export const SubmitButton = ({ children: text, isDisabled }: Props): JSX.Element => {
  return (
    <button data-testid="submit" disabled={isDisabled} className="submit" type="submit">
      {text}
    </button>
  )
}
