import { Component } from 'react'
import { DisplayStyled } from './components'

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
      <DisplayStyled error={error} result={result}>
        {value}
        <div>{result}</div>
      </DisplayStyled>
    )
  }
}

export default Display
