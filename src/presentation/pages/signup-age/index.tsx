import './styles.scss'
import { FormProvider } from '@/presentation/store/context'
import { Footer, LoginHeader, Input, FormStatus } from '@/presentation/components'
import { withProvider } from '@/presentation/helpers'

import React from 'react'
import { Link } from 'react-router-dom'

const SignUpComponent = (): JSX.Element => {
  return (
    <div className="signup">
      <LoginHeader />
      <form className="form">
        <h2>Criar Conta</h2>
        <Input type="text" name="name" placeholder="Digite seu nome" />
        <Input type="email" name="email" placeholder="Digite seu e-mail" />
        <Input type="password" name="password" placeholder="Digite sua senha" />
        <Input type="password" name="passwordConfirmation" placeholder="Repita sua senha" />
        <button className="submit" type="submit">
          Entrar
        </button>
        <Link to="/login" className="link">
          Voltar para Login
        </Link>
        <FormStatus />
      </form>
      <Footer />
    </div>
  )
}

export const SignUp = withProvider(FormProvider)<{}>(SignUpComponent)
