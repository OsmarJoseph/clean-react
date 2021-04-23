import styles from './styles.scss'
import {Authentication} from '@/domain/usecases'
import {Validation} from '@/presentation/protocols'
import {FormProvider, useFormContext} from '@/presentation/store/context'
import {Footer, LoginHeader, Input, FormStatus} from '@/presentation/components'
import {withProvider} from '@/presentation/helpers'

import React, {useCallback, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'

type Props = {
  validation: Validation
  authentication: Authentication
}

const LoginPageComponent = ({
  validation,
  authentication,
}: Props): JSX.Element => {
  const {
    inputValues: {email, password},
    inputErrors,
    setInputErrors,
    isLoading,
    setIsLoading,
    setErrorMessage,
  } = useFormContext()

  const history = useHistory()

  useEffect(() => {
    setInputErrors({
      email: validation.validate(['email', email]),
      password: validation.validate(['password', password]),
    })
  }, [email, password])

  const hasInputErrors = !!inputErrors.email || !!inputErrors.password

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      if (isLoading || hasInputErrors) return
      setIsLoading(true)
      try {
        const account = await authentication.auth({email, password})
        localStorage.setItem('accessToken', account.accessToken)
        history.replace('/')
      } catch (error) {
        setErrorMessage(error.message)
      } finally {
        setIsLoading(false)
      }
    },
    [isLoading, email, password, hasInputErrors]
  )

  const buttonIsDisabled = hasInputErrors

  return (
    <div className={styles.login}>
      <LoginHeader />
      <form data-testid='form' className={styles.form} onSubmit={handleSubmit}>
        <h2>Login</h2>
        <Input type='email' name='email' placeholder='Digite seu e-mail' />
        <Input type='password' name='password' placeholder='Digite sua senha' />
        <button
          data-testid='submit'
          disabled={buttonIsDisabled}
          className={styles.submit}
          type='submit'
        >
          Entrar
        </button>
        <Link data-testid='signup' to='/signup' className={styles.link}>
          Criar conta
        </Link>
        <FormStatus />
      </form>
      <Footer />
    </div>
  )
}

export const LoginPage = withProvider(FormProvider)<Props>(LoginPageComponent)
