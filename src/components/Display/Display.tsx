import { Component } from 'react'
import { DisplayStyled, DisplayTempRes } from './components'

type DisplayProps = {
  value: string
  result: string
  error: boolean
}

class Display extends Component<DisplayProps> {
  constructor(props: DisplayProps) {
    super(props)
  }

  render() {
    const { value, error, result } = this.props
    return (
      <DisplayStyled error={error}>
        {value}
        <DisplayTempRes result={!!result}>{result}</DisplayTempRes>
      </DisplayStyled>
    )
  }
}

export default Display
