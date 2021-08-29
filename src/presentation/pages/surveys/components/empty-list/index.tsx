import './styles.scss'

import React, { Fragment } from 'react'

export const EmptySurveyItemList = (): JSX.Element => {
  return (
    <Fragment>
      <li className="c-empty-survey-item" data-testid="empty-survey-item" />
      <li className="c-empty-survey-item" data-testid="empty-survey-item" />
      <li className="c-empty-survey-item" data-testid="empty-survey-item" />
      <li className="c-empty-survey-item" data-testid="empty-survey-item" />
    </Fragment>
  )
}
