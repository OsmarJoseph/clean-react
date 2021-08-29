import './styles.scss'
import { AddAccount } from '@/domain/usecases'
import { FormProvider, useApiContext, useFormContext } from '@/presentation/store/context'
import { Footer, LoginHeader, Input, FormStatus, SubmitButton } from '@/presentation/components'
import { Validation } from '@/presentation/protocols'
import { withProvider } from '@/presentation/helpers'

import React, { useCallback, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

type Props = {
  validation: Validation
  addAccount: AddAccount
}

const SignUpComponent = ({ validation, addAccount }: Props): JSX.Element => {
  const { setCurrentAccount } = useApiContext()

  const {
    inputValues: { name, email, password, passwordConfirmation },
    isFormValid,
    setIsFormValid,
    setInputErrors,
    setIsLoading,
    isLoading,
    setErrorMessage,
  } = useFormContext()

  const history = useHistory()

  useEffect(() => {
    const nameError = validation.validate({ name })
    const emailError = validation.validate({ email })
    const passwordError = validation.validate({ password })
    const passwordConfirmationError = validation.validate({ passwordConfirmation, password })
    setInputErrors({
      name: nameError,
      email: emailError,
      password: passwordError,
      passwordConfirmation: passwordConfirmationError,
    })
    setIsFormValid(!nameError && !emailError && !passwordError && !passwordConfirmationError)
  }, [name, email, password, passwordConfirmation])

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      if (isLoading || !isFormValid) return

      setIsLoading(true)

      try {
        const account = await addAccount.add({ name, email, password, passwordConfirmation })
        await setCurrentAccount(account)
        history.replace('/')
      } catch (error) {
        setErrorMessage(error.message)
      } finally {
        setIsLoading(false)
      }
    },
    [isLoading, email, name, password, passwordConfirmation, isFormValid],
  )

  return (
    <div className="signup">
      <LoginHeader />
      <form data-testid="form" className="form" onSubmit={handleSubmit}>
        <h2>Criar Conta</h2>
        <Input type="text" name="name" placeholder="Digite seu nome" />
        <Input type="email" name="email" placeholder="Digite seu e-mail" />
        <Input type="password" name="password" placeholder="Digite sua senha" />
        <Input type="password" name="passwordConfirmation" placeholder="Repita sua senha" />
        <SubmitButton isDisabled={!isFormValid}>Cadastrar</SubmitButton>
        <Link data-testid="login" to="/login" className="link" replace>
          Voltar para Login
        </Link>
        <FormStatus />
      </form>
      <Footer />
    </div>
  )
}

export const SignUpPage = withProvider(FormProvider)<Props>(SignUpComponent)
