import './styles.scss'
import { ResultAnswer } from '@/domain/models'
import { useSurveyResultContext } from '@/presentation/store/context'

import React, { useCallback } from 'react'

type Props = { answer: ResultAnswer }

const activeClass = 'c-result-answer--active'

export const Answer = Object.assign(
  ({ answer: { image, answer, percent, isCurrentAccountAnswer } }: Props): JSX.Element => {
    const { isLoading, onAnswer } = useSurveyResultContext()

    const handleClick = useCallback(() => {
      if (isCurrentAccountAnswer || isLoading) return
      onAnswer(answer)
    }, [isLoading])

    return (
      <li
        className={`c-result-answer ${isCurrentAccountAnswer ? activeClass : ''}`}
        onClick={handleClick}
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
