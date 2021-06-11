import './styles.scss'
import { Authentication, SaveAccessToken } from '@/domain/usecases'
import { Validation } from '@/presentation/protocols'
import { FormProvider, useFormContext } from '@/presentation/store/context'
import { Footer, LoginHeader, Input, FormStatus, SubmitButton } from '@/presentation/components'
import { withProvider } from '@/presentation/helpers'

import React, { useCallback, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

type Props = {
  validation: Validation
  authentication: Authentication
  saveAccessToken: SaveAccessToken
}

const LoginPageComponent = ({
  validation,
  saveAccessToken,
  authentication,
}: Props): JSX.Element => {
  const {
    inputValues: { email, password },
    setInputErrors,
    isLoading,
    setIsLoading,
    setErrorMessage,
    isFormValid,
    setIsFormValid,
  } = useFormContext()

  const history = useHistory()

  useEffect(() => {
    const emailError = validation.validate(['email', email])
    const passwordError = validation.validate(['password', password])
    setInputErrors({
      email: validation.validate(['email', email]),
      password: validation.validate(['password', password]),
    })
    setIsFormValid(!emailError && !passwordError)
  }, [email, password])

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      if (isLoading || !isFormValid) return
      setIsLoading(true)
      try {
        const account = await authentication.auth({ email, password })
        await saveAccessToken.save(account.accessToken)
        history.replace('/')
      } catch (error) {
        setErrorMessage(error.message)
      } finally {
        setIsLoading(false)
      }
    },
    [isLoading, email, password],
  )

  return (
    <div className="login">
      <LoginHeader />
      <form data-testid="form" className="form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <Input type="email" name="email" placeholder="Digite seu e-mail" />
        <Input type="password" name="password" placeholder="Digite sua senha" />
        <SubmitButton isDisabled={!isFormValid}>Entrar</SubmitButton>
        <Link data-testid="signup" to="/signup" className="link">
          Criar conta
        </Link>
        <FormStatus />
      </form>
      <Footer />
    </div>
  )
}

export const LoginPage = withProvider(FormProvider)<Props>(LoginPageComponent)
