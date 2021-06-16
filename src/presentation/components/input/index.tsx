import './styles.scss'
import { FormInputs, useFormContext } from '@/presentation/store/context'

import React, { useCallback, useRef } from 'react'

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & { name: keyof FormInputs }

export const Input = (props: Props): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>()
  const { inputValues, setInputValues, inputErrors } = useFormContext()
  const { name: inputName } = props
  const thisInputError = inputErrors[inputName]

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValues({ ...inputValues, [inputName]: event.target.value })
    },
    [inputValues, setInputValues],
  )

  const handleLabelClick = useCallback(() => {
    inputRef.current.focus()
  }, [])

  const getStatus = useCallback(() => {
    return thisInputError ? '🔴' : '🟢'
  }, [thisInputError])

  const getTitle = useCallback(() => {
    return thisInputError || 'Tudo certo!'
  }, [thisInputError])

  return (
    <div className="inputWrap">
      <input
        {...props}
        ref={inputRef}
        placeholder=" "
        data-testid={inputName}
        onChange={handleChange}
      />
      <label onClick={handleLabelClick}>{props.placeholder}</label>
      <span title={getTitle()} className="status" data-testid={`${inputName}-status`}>
        {getStatus()}
      </span>
    </div>
  )
}
