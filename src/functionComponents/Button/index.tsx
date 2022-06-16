import { MouseEvent } from 'react'

import { ButtonStyled } from './components'

type ButtonProps = {
  value: string
  buttonType: string
  width?: string
  height?: string
  handleExpressionValue: (value: string) => void
}

const Button = ({ value, buttonType, width, height, handleExpressionValue }: ButtonProps) => {
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

export { Button }
