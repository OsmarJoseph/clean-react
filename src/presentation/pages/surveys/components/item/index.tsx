import './styles.scss'
import { SurveyModel } from '@/domain/models'
import { Calendar, Icon } from '@/presentation/components'

import React from 'react'
import { Link } from 'react-router-dom'

type Props = {
  survey: SurveyModel
}

export const SurveyItem = ({ survey: { didAnswer, question, date, id } }: Props): JSX.Element => {
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
      <footer className="c-survey-item__footer">
        <Link to={`/surveys/${id}`} className="c-survey-item__footer-link" data-testid="link">
          Ver Resultado
        </Link>
      </footer>
    </li>
  )
}
