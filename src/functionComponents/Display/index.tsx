import { DisplayStyled, DisplayExpression, DisplayRes } from './styles'

import { DisplayProps } from './types'

export const Display = ({ value, error, result }: DisplayProps) => (
  <DisplayStyled>
    <DisplayExpression data-cy="expression-result" error={error} result={result}>
      {value}
    </DisplayExpression>
    <DisplayRes data-cy="result" result={result}>
      {result}
    </DisplayRes>
  </DisplayStyled>
)
