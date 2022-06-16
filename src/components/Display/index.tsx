import { Component } from 'react'

import { DisplayStyled } from './components'

interface DisplayProps {
  value: string
  result: string
  error: boolean
}

class Display extends Component<DisplayProps> {
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

export { Display }
