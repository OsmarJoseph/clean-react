import styles from './styles.scss'
import {useFormContext} from '@/presentation/store/context'

import React, {useCallback} from 'react'

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

export const Input = (props: Props): JSX.Element => {
  const {inputValues, setInputValues, inputErrors} = useFormContext()
  const {name: inputName} = props
  const thisInputError = inputErrors[inputName]

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValues({...inputValues, [inputName]: event.target.value})
    },
    [inputValues, setInputValues]
  )

  const getStatus = useCallback(() => {
    return thisInputError ? '🔴' : '🟢'
  }, [thisInputError])

  const getTitle = useCallback(() => {
    return thisInputError || 'Tudo certo!'
  }, [thisInputError])

  return (
    <div className={styles.inputWrap}>
      <input {...props} data-testid={inputName} onChange={handleChange} />
      <span
        title={getTitle()}
        className={styles.status}
        data-testid={`${inputName}-status`}
      >
        {getStatus()}
      </span>
    </div>
  )
}
