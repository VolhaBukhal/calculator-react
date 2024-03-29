import { Component, MouseEvent } from 'react'

import { ButtonProps } from './interfaces'
import { ButtonStyled } from './styles'

export class Button extends Component<ButtonProps> {
  handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.textContent
    if (value) {
      this.props.handleExpressionValue(value)
    }
  }

  render() {
    const { value, buttonType, width, height } = this.props
    return (
      <ButtonStyled
        buttonType={buttonType}
        width={width}
        height={height}
        onClick={this.handleClick}
      >
        {value}
      </ButtonStyled>
    )
  }
}
