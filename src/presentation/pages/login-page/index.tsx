import styles from './styles.scss'
import {Footer, LoginHeader, Input, FormStatus} from '@/presentation/components'

import React from 'react'

export const LoginPage = (): JSX.Element => {
  return (
    <div className={styles.login}>
      <LoginHeader />
      <form className={styles.form}>
        <h2>Login</h2>
        <Input type='email' name='email' placeholder='Digite seu e-mail' />
        <Input type='password' name='password' placeholder='Digite sua senha' />
        <button className={styles.submit} type='submit'>
          Entrar
        </button>
        <span className={styles.link}>Criar conta</span>
        <FormStatus />
      </form>
      <Footer />
    </div>
  )
}
