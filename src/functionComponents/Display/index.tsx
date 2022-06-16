import { DisplayStyled } from './components'

type DisplayProps = {
  value: string
  result: string
  error: boolean
}

export const Display = ({ value, error, result }: DisplayProps) => (
  <DisplayStyled error={error} result={result}>
    {value}
    <div>{result}</div>
  </DisplayStyled>
)
