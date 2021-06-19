import './styles.scss'
import { Footer, Header, Icon } from '@/presentation/components'

import React from 'react'

type Props = {}

export const SurveysListPage = (props: Props): JSX.Element => {
  return (
    <div className="c-surveys-list">
      <Header />
      <div className="c-surveys-list__content">
        <h2 className="c-surveys-list__title">Enquetes</h2>
        <ul className="c-surveys-list__list">
          <li className="c-surveys-list__item">
            <div className="c-surveys-list__item-content">
              <Icon className="c-surveys-list__item-content-icon" iconName="thumbUp" />
              <time className="c-surveys-list__item-content-time">
                <span className="c-surveys-list__item-content-time-day">22</span>
                <span className="c-surveys-list__item-content-time-month">03</span>
                <span className="c-surveys-list__item-content-time-year">2020</span>
              </time>
              <p className="c-surveys-list__item-content-question">
                Qual é seu framework favorito ?
              </p>
            </div>
            <footer className="c-surveys-list__item-footer">Ver Resultado</footer>
          </li>
          <li className="c-surveys-list__item" />
        </ul>
      </div>
      <Footer />
    </div>
  )
}
