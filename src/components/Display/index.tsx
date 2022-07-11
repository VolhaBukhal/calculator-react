import { Component } from 'react'

import { DisplayStyled, DisplayExpression, DisplayRes } from './styles'

import { DisplayProps } from './interfaces'

export class Display extends Component<DisplayProps> {
  render() {
    const { value, error, result } = this.props
    return (
      <DisplayStyled>
        <DisplayExpression data-cy="expression-result" error={error} result={result}>
          {value}
        </DisplayExpression>
        <DisplayRes data-cy="result" result={result}>
          {result}
        </DisplayRes>
      </DisplayStyled>
    )
  }
}
