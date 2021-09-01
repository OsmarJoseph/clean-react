import './styles.scss'
import { Calendar, Footer, Header, Loading } from '@/presentation/components'

import React from 'react'
import FlipMove from 'react-flip-move'

export const SurveyResultPage = (): JSX.Element => {
  return (
    <div className="c-survey-result">
      <Header />
      <div className="c-survey-result__content">
        <hgroup className="c-survey-result__hgroup">
          <Calendar date={new Date()} className="c-survey-result__time" />
          <h2 className="c-survey-result__title">Pergunta</h2>
        </hgroup>
        <FlipMove className="c-survey-result__items">
          <li className="c-survey-result__item">
            <img src="" alt="" className="c-survey-result__item-image" />
            <span className="c-survey-result__item-answer">React</span>
            <span className="c-survey-result__item-percent">50%</span>
          </li>
        </FlipMove>
        <button className="c-survey-result__back-button">Voltar</button>
        <Loading />
      </div>
      <Footer />
    </div>
  )
}
