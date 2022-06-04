import { Component } from 'react'
import { ButtonStyled } from './components'

type ButtonProps = {
  value: string
  buttonType: string
  width?: string
  height?: string
}

class Button extends Component<ButtonProps> {
  constructor(props: ButtonProps) {
    super(props)
  }
  render() {
    const { value, buttonType, width, height } = this.props
    return (
      <ButtonStyled buttonType={buttonType} width={width} height={height}>
        {value}
      </ButtonStyled>
    )
  }
}

export default Button
