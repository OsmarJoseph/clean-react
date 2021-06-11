import './styles.scss'
import { AddAccount, SaveAccessToken } from '@/domain/usecases'
import { FormProvider, useFormContext } from '@/presentation/store/context'
import { Footer, LoginHeader, Input, FormStatus } from '@/presentation/components'
import { Validation } from '@/presentation/protocols'
import { withProvider } from '@/presentation/helpers'

import React, { useCallback, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

type Props = {
  validation: Validation
  saveAccessToken: SaveAccessToken
  addAccount: AddAccount
}

const SignUpComponent = ({ validation, saveAccessToken, addAccount }: Props): JSX.Element => {
  const {
    inputValues: { name, email, password, passwordConfirmation },
    inputErrors,
    setInputErrors,
    setIsLoading,
    isLoading,
    setErrorMessage,
  } = useFormContext()

  const hasInputErrors =
    !!inputErrors.name ||
    !!inputErrors.email ||
    !!inputErrors.password ||
    !!inputErrors.passwordConfirmation

  const history = useHistory()

  useEffect(() => {
    setInputErrors({
      name: validation.validate(['name', name]),
      email: validation.validate(['email', email]),
      password: validation.validate(['password', password]),
      passwordConfirmation: validation.validate(['passwordConfirmation', passwordConfirmation]),
    })
  }, [name])

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      if (isLoading || hasInputErrors) return

      setIsLoading(true)

      try {
        const account = await addAccount.add({ name, email, password, passwordConfirmation })
        await saveAccessToken.save(account.accessToken)
        history.replace('/')
      } catch (error) {
        setErrorMessage(error.message)
      } finally {
        setIsLoading(false)
      }
    },
    [isLoading, email, name, password, passwordConfirmation, hasInputErrors],
  )

  const buttonIsDisabled = hasInputErrors

  return (
    <div className="signup">
      <LoginHeader />
      <form data-testid="form" className="form" onSubmit={handleSubmit}>
        <h2>Criar Conta</h2>
        <Input type="text" name="name" placeholder="Digite seu nome" />
        <Input type="email" name="email" placeholder="Digite seu e-mail" />
        <Input type="password" name="password" placeholder="Digite sua senha" />
        <Input type="password" name="passwordConfirmation" placeholder="Repita sua senha" />
        <button data-testid="submit" disabled={buttonIsDisabled} className="submit" type="submit">
          Entrar
        </button>
        <Link data-testid="login" to="/login" className="link" replace>
          Voltar para Login
        </Link>
        <FormStatus />
      </form>
      <Footer />
    </div>
  )
}

export const SignUp = withProvider(FormProvider)<Props>(SignUpComponent)
