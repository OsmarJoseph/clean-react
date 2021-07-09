import './styles.scss'
import { SurveyModel } from '@/domain/models'
import { Icon } from '@/presentation/components'

import React from 'react'

type Props = {
  survey: SurveyModel
}

export const SurveyItem = ({ survey: { didAnswer, question, date } }: Props): JSX.Element => {
  const iconName = didAnswer ? 'thumbUp' : 'thumbDown'

  const day = date.getDate().toString().padStart(2, '0')
  const month = date.toLocaleString('pt-BR', { month: 'short' }).replace('.', '')
  const year = date.getFullYear()

  return (
    <li className="c-survey-item" data-testid="survey-item">
      <div className="c-survey-item__content">
        <Icon className="c-survey-item__content-icon" iconName={iconName} />
        <time className="c-survey-item__content-time">
          <span className="c-survey-item__content-time-day" data-testid="day">
            {day}
          </span>
          <span className="c-survey-item__content-time-month" data-testid="month">
            {month}
          </span>
          <span className="c-survey-item__content-time-year" data-testid="year">
            {year}
          </span>
        </time>
        <p className="c-survey-item__content-question" data-testid="question">
          {question}
        </p>
      </div>
      <footer className="c-survey-item__footer">Ver Resultado</footer>
    </li>
  )
}
