import { Component } from 'react'
import { DisplayStyled } from './components'

type DisplayProps = {
  value: string
}

class Display extends Component<DisplayProps> {
  constructor(props: DisplayProps) {
    super(props)
  }
  render() {
    return <DisplayStyled>{this.props.value}</DisplayStyled>
  }
}

export default Display
