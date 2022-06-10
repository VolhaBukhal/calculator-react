import { Component } from 'react'
import { Wrapper } from './components'
import Display from '@components/Display'
import Keyboard from '@components/Keyboard/Keyboard'
import History from '@components/History'

import {
  doCalcExpression,
  checkCommaIsUnique,
  checkLastSignIsOperand,
  generateErrorMsg,
} from '@helpers/expressionCalculator'
import { localStorageSetHistory, localStorageGetHistory } from '@helpers/localStorage'

enum SecondaryOperands {
  CLEAR_ALL = 'AC',
  EQUAL = '=',
  COMMA = '.',
  CLEAR = '->',
  OPPOSITE_SIGN = '+/-',
  OPEN_BRACKET = '(',
  CLOSE_BRACKET = ')',
}

type CalculatorWrapperState = {
  expression: string
  history: Array<string>
  isError: boolean
  isFinished: boolean
}

class CalculatorWrapper extends Component<Record<string, unknown>, CalculatorWrapperState> {
  constructor(props: Record<string, unknown>) {
    super(props)
    this.state = {
      expression: '0',
      history: [],
      isError: false,
      isFinished: false,
    }
  }

  handleExpressionValue = (pressedBtnValue: string) => {
    switch (pressedBtnValue) {
      case SecondaryOperands.CLEAR_ALL:
        this.handleClearDisplay()
        break

      case SecondaryOperands.EQUAL:
        this.handleCalculation()
        break

      case SecondaryOperands.COMMA:
        this.handleComma(pressedBtnValue)
        break

      case SecondaryOperands.CLEAR:
        this.handleBackOneSign()
        break

      case SecondaryOperands.OPPOSITE_SIGN:
        this.handleOppositeSign()
        break

      case SecondaryOperands.OPEN_BRACKET:
        this.handleOpenBracket(pressedBtnValue)
        break

      case SecondaryOperands.CLOSE_BRACKET:
        this.handleCloseBracket(pressedBtnValue)
        break

      default:
        this.handleNumber(pressedBtnValue)
    }
  }

  handleClearDisplay = () => {
    this.setState({ expression: '0', isError: false, isFinished: false })
  }

  handleComma = (value: string) => {
    const curValue = this.state.expression
    const { isCommaAlreadyExist } = checkCommaIsUnique(curValue)
    if (!isCommaAlreadyExist) {
      this.setState(({ expression }) => ({
        expression: expression + value,
      }))
    }
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

  handleOpenBracket = (value: string) => {
    const { expression, isFinished } = this.state
    if ((expression.length === 1 && expression === '0') || isFinished) {
      this.setState({ expression: value, isFinished: false })
    } else {
      const lastSign = expression.charAt(expression.length - 1)
      const { lastSignIsOperand } = checkLastSignIsOperand(expression)
      if (lastSignIsOperand) {
        this.setState({ expression: expression + value })
      } else if (lastSign === '(') {
        this.setState({ expression: expression + value })
      }
    }
  }

  handleCloseBracket = (value: string) => {
    const { expression } = this.state
    const { lastSignIsOperand } = checkLastSignIsOperand(expression)
    if (expression.length !== 1 && !lastSignIsOperand && expression.includes('(')) {
      this.setState({ expression: expression + value })
    }
  }

  handleNumber = (value: string) => {
    const { expression, isError, isFinished } = this.state
    const operands = '+-/x%'
    const curValueIsOperand = operands.includes(value)
    const isDoubleZero = value === '00'
    if (expression === '0') {
      if (!isDoubleZero && !curValueIsOperand) {
        this.setState({ expression: value, isFinished: false })
      }
    } else {
      if (isError) {
        this.setState({ expression: value, isError: false })
      } else if (isFinished && !curValueIsOperand) {
        this.setState({ expression: value, isFinished: false })
      } else {
        const { lastSignIsOperand } = checkLastSignIsOperand(expression)
        if (!lastSignIsOperand) {
          this.setState(({ expression }) => ({
            expression: expression + value,
            isFinished: false,
          }))
        } else {
          if (!curValueIsOperand) {
            if (!isDoubleZero) {
              this.setState(({ expression }) => ({
                expression: expression + value,
                isFinished: false,
              }))
            }
          }
        }
      }
    }
  }

  handleCalculation = () => {
    this.setState(
      ({ history }) => ({
        history: [...history, this.state.expression],
      }),
      () => {
        localStorageSetHistory(this.state.history)
      }
    )

    const res = doCalcExpression(this.state.expression)

    if (res || res === 0) {
      if (String(res).includes('Error')) {
        const errRes = generateErrorMsg(String(res))
        this.setState({ expression: errRes, isError: true, isFinished: true })
      } else {
        this.setState({ expression: String(res), isFinished: true })
      }
    }
  }

  componentDidMount() {
    const storedHistory: string[] = localStorageGetHistory()
    this.setState({ history: storedHistory })
  }

  render() {
    const { expression, history, isError } = this.state
    return (
      <>
        <Wrapper>
          <Display error={isError} value={expression} />
          <Keyboard handleButton={this.handleExpressionValue} />
        </Wrapper>
        <History historyData={history} />
      </>
    )
  }
}

export default CalculatorWrapper
