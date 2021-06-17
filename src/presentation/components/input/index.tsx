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

  return (
    <div
      className="inputWrap"
      data-status={thisInputError ? 'invalid' : 'valid'}
      data-testid={`${inputName}-wrap`}
    >
      <input
        {...props}
        title={thisInputError}
        ref={inputRef}
        placeholder=" "
        onChange={handleChange}
        data-testid={inputName}
      />
      <label onClick={handleLabelClick} title={thisInputError} data-testid={`${inputName}-label`}>
        {props.placeholder}
      </label>
    </div>
  )
}
