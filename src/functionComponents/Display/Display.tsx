import { DisplayStyled } from './components'

type DisplayProps = {
  value: string
  result: string
  error: boolean
}

const Display = ({ value, error, result }: DisplayProps) => {
  return (
    <DisplayStyled error={error} result={result}>
      {value}
      <div>{result}</div>
    </DisplayStyled>
  )
}

export default Display
