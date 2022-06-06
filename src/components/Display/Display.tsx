import { Component } from 'react'
import { DisplayStyled, DisplayRes } from './components'

type DisplayProps = {
  value: string
}

class Display extends Component<DisplayProps> {
  constructor(props: DisplayProps) {
    super(props)
  }
  render() {
    const { value } = this.props
    return (
      <DisplayStyled>
        {/* <DisplayTempRes>({currentRes}) </DisplayTempRes> */}
        {/* <DisplayRes>{value}</DisplayRes> */}
        {value}
      </DisplayStyled>
    )
  }
}

export default Display
