import { MouseEvent } from 'react'

import { ButtonProps } from './types'
import { ButtonStyled } from './styles'

export const Button = ({
  value,
  buttonType,
  width,
  height,
  handleExpressionValue,
}: ButtonProps) => {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.textContent
    if (value) {
      handleExpressionValue(value)
    }
  }

  return (
    <ButtonStyled buttonType={buttonType} width={width} height={height} onClick={handleClick}>
      {value}
    </ButtonStyled>
  )
}
