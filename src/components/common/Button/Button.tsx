import { Component, MouseEvent } from 'react'
import { ButtonStyled } from './components'

type ButtonProps = {
  value: string
  buttonType: string
  width?: string
  height?: string
  handleExpressionValue: (value: string) => void
}

class Button extends Component<ButtonProps> {
  constructor(props: ButtonProps) {
    super(props)
  }
  handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const value = (event.target as HTMLButtonElement).textContent
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

export default Button
