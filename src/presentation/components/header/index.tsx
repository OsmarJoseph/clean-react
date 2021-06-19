import './styles.scss'
import { Logo } from '@/presentation/components'

import React, { memo } from 'react'

export const HeaderComponent = (): JSX.Element => {
  return (
    <header className="c-header">
      <div className="c-header__content">
        <Logo className="c-header__logo" />
        <div className="c-header__logout">
          <span className="c-header__logout-username">Osmar</span>
          <a className="c-header__logout-link" href="#">
            Sair
          </a>
        </div>
      </div>
    </header>
  )
}

export const Header = memo(HeaderComponent)
