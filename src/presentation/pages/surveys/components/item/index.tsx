import './styles.scss'
import { SurveyModel } from '@/domain/models'
import { Calendar, Icon } from '@/presentation/components'

import React from 'react'

type Props = {
  survey: SurveyModel
}

export const SurveyItem = ({ survey: { didAnswer, question, date } }: Props): JSX.Element => {
  const iconName = didAnswer ? 'thumbUp' : 'thumbDown'

  return (
    <li className="c-survey-item" data-testid="survey-item">
      <div className="c-survey-item__content">
        <Icon className="c-survey-item__content-icon" iconName={iconName} />
        <Calendar date={date} className="c-survey-item__content-time" />
        <p className="c-survey-item__content-question" data-testid="question">
          {question}
        </p>
      </div>
      <footer className="c-survey-item__footer">Ver Resultado</footer>
    </li>
  )
}
