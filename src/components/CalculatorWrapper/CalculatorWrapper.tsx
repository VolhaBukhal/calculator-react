import { Component } from 'react'
import { Wrapper } from './components'
import Display from '@components/Display'

import Keyboard from '@components/Keyboard/Keyboard'

class CalculatorWrapper extends Component<Record<string, unknown>> {
  render() {
    return (
      <Wrapper>
        <Display />
        <Keyboard />
      </Wrapper>
    )
  }
}

export default CalculatorWrapper
