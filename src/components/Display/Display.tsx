import { Component } from 'react'
import { DisplayStyled } from './components'

type DisplayProps = {
  value: string
  error: boolean
}

class Display extends Component<DisplayProps> {
  constructor(props: DisplayProps) {
    super(props)
  }

  render() {
    const { value, error } = this.props
    return <DisplayStyled error={error}>{value}</DisplayStyled>
  }
}

export default Display
