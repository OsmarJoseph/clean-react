import './styles.scss'

import React from 'react'

type Props = {
  date: Date
  className?: string
}

export const Calendar = ({ date, className }: Props): JSX.Element => {
  const day = date.getDate().toString().padStart(2, '0')
  const month = date.toLocaleString('pt-BR', { month: 'short' }).replace('.', '').toLowerCase()
  const year = date.getFullYear()

  return (
    <time className={`c-time ${className}`}>
      <span className="c-time__day" data-testid="day">
        {day}
      </span>
      <span className="c-time__month" data-testid="month">
        {month}
      </span>
      <span className="c-time__year" data-testid="year">
        {year}
      </span>
    </time>
  )
}
