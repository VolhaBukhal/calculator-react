import { DisplayStyled } from './components'

type DisplayProps = {
  value: string
}

const Display = ({ value }: DisplayProps) => {
  return <DisplayStyled>{value}</DisplayStyled>
}

export default Display
