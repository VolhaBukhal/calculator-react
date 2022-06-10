import { DisplayStyled } from './components'

type DisplayProps = {
  value: string
  error: boolean
}

const Display = ({ value, error }: DisplayProps) => {
  return <DisplayStyled error={error}>{value}</DisplayStyled>
}

export default Display
