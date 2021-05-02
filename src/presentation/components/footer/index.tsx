import './styles.scss'

import React, { memo } from 'react'

const FooterComponent = (): JSX.Element => {
  return <footer className="footer"></footer>
}

export const Footer = memo(FooterComponent)
