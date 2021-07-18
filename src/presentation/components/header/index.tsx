import './styles.scss'
import { Logo } from '@/presentation/components'
import { useApiContext } from '@/presentation/store/context'

import React, { memo, useCallback } from 'react'
import { useHistory } from 'react-router-dom'

export const HeaderComponent = (): JSX.Element => {
  const { setCurrentAccount, getCurrentAccount } = useApiContext()
  const account = getCurrentAccount()
  const history = useHistory()

  const handleLogOutClick = useCallback(
    async (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      event.preventDefault()

      await setCurrentAccount(null)
      history.replace('/login')
    },
    [],
  )
  return (
    <header className="c-header">
      <div className="c-header__content">
        <Logo className="c-header__logo" />
        <div className="c-header__logout">
          <span className="c-header__logout-username" data-testid="username">
            {account.name}
          </span>
          <a
            className="c-header__logout-link"
            href="#"
            onClick={handleLogOutClick}
            data-testid="logout"
          >
            Sair
          </a>
        </div>
      </div>
    </header>
  )
}

export const Header = memo(HeaderComponent)
