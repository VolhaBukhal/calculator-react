import { DisplayStyled, DisplayExpression, DisplayRes } from './components'

type DisplayProps = {
  value: string
  result: string
  error: boolean
}

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
