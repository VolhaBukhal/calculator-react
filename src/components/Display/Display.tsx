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
    const { value } = this.props
    return <DisplayStyled>{value}</DisplayStyled>
  }
}

export default Display
