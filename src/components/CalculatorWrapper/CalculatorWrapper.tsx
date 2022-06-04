import { Component } from 'react'
import { Wrapper } from './components'
import Display from '@components/Display'
import Keyboard from '@components/Keyboard/Keyboard'
import History from '@components/History'

const history = [
  '25+5',
  '100*200',
  '48/2',
  '(15+27)/3*12',
  '25+5',
  '100*200',
  '48/2',
  '(15+27)/3*12',
  '25+5',
  '100*200',
  '48/2',
  '(15+27)/3*12',
  '25+5',
  '100*200',
  '48/2',
  '(15+27)/3*12',
]

type CalculatorWrapperState = {
  expression: string
  history: Array<string>
}

class CalculatorWrapper extends Component<Record<string, unknown>, CalculatorWrapperState> {
  constructor(props: Record<string, unknown>) {
    super(props)
    this.state = {
      expression: '0',
      history: history,
    }
  }

  handleExpressionValue = (value: string) => {
    switch (value) {
      case 'AC':
        this.handleClearDisplay()
        break

      case '=':
        console.log('====')
        // this.handleClearDisplay()
        break

      default:
        this.setState(({ expression }) => ({
          expression: expression + value,
        }))
    }
  }

  handleClearDisplay = () => {
    this.setState({ expression: '0' })
  }

  render() {
    const { expression, history } = this.state
    return (
      <>
        <Wrapper>
          <Display value={expression} />
          <Keyboard handleButton={this.handleExpressionValue} />
        </Wrapper>
        <History historyData={history} />
      </>
    )
  }
}

export default CalculatorWrapper
