import { Component } from 'react'
import { Wrapper } from './components'
import Display from '@components/Display'
import Keyboard from '@components/Keyboard/Keyboard'
import History from '@components/History'

import {
  doCalcExpression,
  checkCommaIsUnique,
  checkLastSignIsOperator,
  generateErrorMsg,
  checkLastSignIsOpenBrackets,
  checkNumberExistAfterLastOpenBracket,
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
    const { expression, isError } = this.state
    const { isCommaAlreadyExist } = checkCommaIsUnique(expression)
    if (!isError) {
      if (!isCommaAlreadyExist) {
        this.setState(({ expression }) => ({
          expression: expression + value,
        }))
      }
    }
  }

  handleBackOneSign = () => {
    const { expression, isError } = this.state
    if (!isError) {
      if (expression.length > 1) {
        const cuttedValue = expression
          .split('')
          .splice(0, expression.length - 1)
          .join('')
        this.setState({ expression: cuttedValue })
      } else {
        this.setState({ expression: '0' })
      }
    }
  }

  handleOppositeSign = () => {
    let curValue = this.state.expression
    const { isError } = this.state
    if (!isError) {
      if (curValue.includes('-')) {
        curValue = curValue.split('').splice(1).join('')
        this.setState({ expression: curValue })
      } else {
        if (curValue !== '0') {
          this.setState({ expression: `-${curValue}` })
        }
      }
    }
  }

  handleOpenBracket = (value: string) => {
    const { expression, isFinished, isError } = this.state
    if (!isError) {
      if ((expression.length === 1 && expression === '0') || isFinished) {
        this.setState({ expression: value, isFinished: false })
      } else {
        const lastSign = expression.charAt(expression.length - 1)
        const { lastSignIsOperator } = checkLastSignIsOperator(expression)
        if (lastSignIsOperator) {
          this.setState({ expression: expression + value })
        } else if (lastSign === '(') {
          this.setState({ expression: expression + value })
        }
      }
    }
  }

  handleCloseBracket = (value: string) => {
    const { expression } = this.state
    const { lastSignIsOperator } = checkLastSignIsOperator(expression)
    const { numberIsExist } = checkNumberExistAfterLastOpenBracket(expression)
    if (
      expression.length !== 1 &&
      !lastSignIsOperator &&
      expression.includes('(') &&
      numberIsExist
    ) {
      this.setState({ expression: expression + value })
    }
  }

  handleNumber = (value: string) => {
    const { expression, isError, isFinished } = this.state
    const operators = '+-/x%'
    const curValueIsOperator = operators.includes(value)
    const { lastSignIsOperator } = checkLastSignIsOperator(expression)
    const { lastSignIsOpenBracket } = checkLastSignIsOpenBrackets(expression)
    const isDoubleZero = value === '00'
    if (expression === '0') {
      if (!isDoubleZero && !curValueIsOperator) {
        this.setState({ expression: value, isFinished: false })
      }
    } else {
      if (isError && !curValueIsOperator) {
        this.setState({ expression: value, isError: false })
      } else if (isFinished && !curValueIsOperator) {
        this.setState({ expression: value, isFinished: false })
      } else {
        if (!lastSignIsOperator && !isError && !lastSignIsOpenBracket) {
          this.setState(({ expression }) => ({
            expression: expression + value,
            isFinished: false,
          }))
        } else {
          if (!curValueIsOperator) {
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
