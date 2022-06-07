import { Component } from 'react'
import { Wrapper } from './components'
import Display from '@components/Display'
import Keyboard from '@components/Keyboard/Keyboard'
import History from '@components/History'

import { doCalcExpression } from '@/helpers/expressionCalculator'
import { localStorageSetHistory } from '@/helpers/localStorage'

// const history = [
//   '25+5',
//   '100*200',
//   '48/2',
//   '(15+27)/3*12',
//   '25+5',
//   '100*200',
//   '48/2',
//   '(15+27)/3*12',
//   '25+5',
//   '100*200',
//   '48/2',
//   '(15+27)/3*12',
//   '25+5',
//   '100*200',
//   '48/2',
//   '(15+27)/3*12',
// ]

type CalculatorWrapperState = {
  expression: string
  history: Array<string>
}

class CalculatorWrapper extends Component<Record<string, unknown>, CalculatorWrapperState> {
  constructor(props: Record<string, unknown>) {
    super(props)
    this.state = {
      expression: '0',
      history: [],
    }
  }

  handleExpressionValue = (pressedBtnValue: string) => {
    switch (pressedBtnValue) {
      case 'AC':
        this.handleClearDisplay()
        break

      case '=':
        this.handleCalculation()
        break

      case '->':
        this.handleBackOneSign()
        break

      case '+/-':
        this.handleOppositeSign()
        break

      default:
        this.handleNumber(pressedBtnValue)
    }
  }

  handleClearDisplay = () => {
    this.setState({ expression: '0' })
  }

  handleBackOneSign = () => {
    const curValue = this.state.expression
    if (curValue.length > 1) {
      const cuttedValue = curValue
        .split('')
        .splice(0, curValue.length - 1)
        .join('')
      this.setState({ expression: cuttedValue })
    } else {
      this.setState({ expression: '0' })
    }
  }

  handleOppositeSign = () => {
    let curValue = this.state.expression
    if (curValue.includes('-')) {
      curValue = curValue.split('').splice(1).join('')
      this.setState({ expression: curValue })
    } else {
      if (curValue !== '0') {
        this.setState({ expression: `-${curValue}` })
      }
    }
  }

  handleNumber = (value: string) => {
    const { expression } = this.state
    if (this.state.expression === '0') {
      this.setState({ expression: value })
    } else {
      const lastInExpression = expression[expression.length - 1]
      const lastSignIsOperand = '+-/x%'.includes(lastInExpression)
      const isOperand = '+-/x%'.includes(value)
      if (!lastSignIsOperand) {
        this.setState(({ expression }) => ({
          expression: expression + value,
        }))
      } else {
        if (!isOperand) {
          this.setState(({ expression }) => ({
            expression: expression + value,
          }))
        }
      }
    }
  }

  handleCalculation = () => {
    this.setState(({ history }) => ({
      history: [...history, this.state.expression],
    }))

    const res = doCalcExpression(this.state.expression)

    if (res || res === 0) {
      this.setState({ expression: String(res) })
    }
  }

  componentWillUnmount() {
    localStorageSetHistory(this.state.history)
  }

  componentDidMount() {
    console.log('componentDidMount')
    // const storedHistory: string[] | null = localStorageGetHistory() | null
    // if (storedHistory) {
    //   this.setState(({ history }) => ({ history: storedHistory }))
    // } else {
    //   return null
    // }
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.pokemons !== this.state.pokemons) {
  //     console.log('pokemons state has changed.')
  //   }
  // }

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
