import './styles.scss'

import React from 'react'
import { ResultAnswer } from '@/domain/models'

type Props = { answer: ResultAnswer }

const activeClass = 'c-result-answer--active'

export const Answer = Object.assign(
  ({ answer: { image, answer, percent, isCurrentAccountAnswer } }: Props): JSX.Element => {
    return (
      <li
        className={`c-result-answer ${isCurrentAccountAnswer ? activeClass : ''}`}
        data-testid="answer-wrap"
      >
        {image && (
          <img src={image} alt={answer} className="c-result-answer__image" data-testid="image" />
        )}
        <span className="c-result-answer__answer" data-testid="answer">
          {answer}
        </span>
        <span className="c-result-answer__percentage" data-testid="percent">
          {percent}%
        </span>
      </li>
    )
  },
  {
    activeClass,
  },
)
