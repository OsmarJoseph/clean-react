import styles from './styles.scss'

import React, { memo } from 'react'

const FooterComponent = (): JSX.Element => {
  return <footer className={styles.footer}></footer>
}

export const Footer = memo(FooterComponent)
