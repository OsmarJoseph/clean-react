import './styles.scss'
import { Footer, Header, Spinner } from '@/presentation/components'

import React from 'react'
import FlipMove from 'react-flip-move'

type Props = {}

export const SurveyResultPage = (props: Props): JSX.Element => {
  return (
    <div className="c-survey-result">
      <Header />
      <div className="c-survey-result__content">
        <h2 className="c-survey-result__content-title">Pergunta</h2>
        <FlipMove className="c-survey-result__items">
          <li className="c-survey-result__item">
            <img src="" alt="" className="c-survey-result__item-image" />
            <span className="c-survey-result__item-answer">React</span>
            <span className="c-survey-result__item-percent">50%</span>
          </li>
        </FlipMove>
        <button className="c-survey-result__back-button">Voltar</button>
        <div className="c-survey-result__loading">
          <div className="c-survey-result__loading-element">
            <span className="c-survey-result__loading-element-text">Aguarde ...</span>
            <Spinner isNegative />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
