import { Component } from 'react'

import { Wrapper } from './styles'
import { Display } from '@components/Display'
import { Keyboard } from '@/components/Keyboard'
import { History } from '@components/History'

import { SecondaryOperators, MainOperators } from '@/constants/calculation'

import {
  doCalcExpression,
  checkCommaIsUnique,
  checkLastSignIsOperator,
  generateErrorMsg,
  checkLastSignIsOpenBrackets,
  checkNumberExistAfterLastOpenBracket,
  checkLastSignIsCloseBrackets,
  getLastNumberInExpr,
  numberIsFloat,
} from '@helpers/expressionCalculator'
import { localStorageSetHistory, localStorageGetHistory } from '@helpers/localStorage'
import {
  Calculator,
  AddCommand,
  SubtractCommand,
  MultiplyCommand,
  DivideCommand,
  RemainderCommand,
  ClearCommand,
} from '@helpers/calculator'

import { CalculatorWrapperState } from './interfaces'

export class CalculatorWrapper extends Component<Record<string, unknown>, CalculatorWrapperState> {
  calculator: Calculator
  constructor(props: Record<string, unknown>) {
    super(props)
    this.calculator = new Calculator()
    this.state = {
      expression: '0',
      currentOperator: '',
      result: '',
      history: [],
      isError: false,
      isFinished: false,
    }
  }

  handleExpressionValue = (pressedBtnValue: string) => {
    switch (pressedBtnValue) {
      case SecondaryOperators.CLEAR_ALL:
        this.handleClearDisplay()
        break

      case SecondaryOperators.COMMA:
        this.handleComma(pressedBtnValue)
        break

      case SecondaryOperators.CLEAR:
        this.handleBackOneSign()
        break

      case SecondaryOperators.OPPOSITE_SIGN:
        this.handleOppositeSign()
        break

      case SecondaryOperators.OPEN_BRACKET:
        this.handleOpenBracket(pressedBtnValue)
        break

      case SecondaryOperators.CLOSE_BRACKET:
        this.handleCloseBracket(pressedBtnValue)
        break

      default:
        this.handleNumber(pressedBtnValue)
    }
  }

  handleClearDisplay = () => {
    this.setState({
      expression: '0',
      isError: false,
      isFinished: false,
      result: '',
      currentOperator: '',
    })
    this.calculator.executeCommand(new ClearCommand())
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
        const cutValue = expression
          .split('')
          .splice(0, expression.length - 1)
          .join('')
        this.setState({ expression: cutValue })
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
    const { lastSignIsOperator } = checkLastSignIsOperator(expression)

    if (!isError) {
      if (value === '(' && lastSignIsOperator) {
        this.calculator.executeCommand(new ClearCommand())
        this.setState({ result: '0', currentOperator: '' })
      }

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
    const { expression, currentOperator } = this.state
    const { lastSignIsOperator } = checkLastSignIsOperator(expression)
    const { numberIsExist } = checkNumberExistAfterLastOpenBracket(expression)
    if (
      expression.length !== 1 &&
      !lastSignIsOperator &&
      expression.includes('(') &&
      numberIsExist
    ) {
      this.setState({ currentOperator: '' })
      this.handleImmediateResult(currentOperator)
      this.setState({ expression: expression + value })
    }
  }

  handleNumber = (value: string) => {
    const { expression, isError, isFinished, currentOperator } = this.state
    const operators = '+-/x%'
    const curValueIsOperator = operators.includes(value)
    const { lastSignIsOperator } = checkLastSignIsOperator(expression)
    const { lastSignIsOpenBracket } = checkLastSignIsOpenBrackets(expression)
    const { lastSignIsCloseBracket } = checkLastSignIsCloseBrackets(expression)
    const isDoubleZero = value === '00'
    if (curValueIsOperator) {
      this.setState({ currentOperator: value })
    }

    if (expression === '0') {
      if (!isDoubleZero && !curValueIsOperator) {
        this.setState({ expression: value, isFinished: false })
      }
    } else {
      if (isError && !curValueIsOperator) {
        this.setState({ expression: value, isError: false })
      } else if (isFinished && !curValueIsOperator) {
        if (!isDoubleZero) {
          this.setState({ expression: value, isFinished: false })
        }
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

    // immediateResult
    if (
      curValueIsOperator &&
      !lastSignIsCloseBracket &&
      !lastSignIsOpenBracket &&
      !lastSignIsOperator
    ) {
      this.handleImmediateResult(currentOperator)
    }

    if (value === SecondaryOperators.EQUAL) {
      this.handleCalculation()
      this.calculator.executeCommand(new ClearCommand())
      this.setState({ result: '', isFinished: true })
    }
  }

  handleImmediateResult = (operator: string) => {
    const { lastNumber } = getLastNumberInExpr(this.state.expression)
    switch (operator) {
      case MainOperators.MINUS:
        this.calculator.executeCommand(new SubtractCommand(lastNumber))
        this.setState({
          result: numberIsFloat(this.calculator.value)
            ? this.calculator.value.toString()
            : this.calculator.value.toFixed(3),
        })
        break

      case MainOperators.PLUS:
        this.calculator.executeCommand(new AddCommand(lastNumber))
        this.setState({
          result: numberIsFloat(this.calculator.value)
            ? this.calculator.value.toString()
            : this.calculator.value.toFixed(3),
        })
        break

      case MainOperators.DIVIDE:
        this.calculator.executeCommand(new DivideCommand(lastNumber))
        this.setState({
          result: numberIsFloat(this.calculator.value)
            ? this.calculator.value.toString()
            : this.calculator.value.toFixed(3),
        })
        break

      case MainOperators.MULTIPLY:
        this.calculator.executeCommand(new MultiplyCommand(lastNumber))
        this.setState({
          result: numberIsFloat(this.calculator.value)
            ? this.calculator.value.toString()
            : this.calculator.value.toFixed(3),
        })
        break

      case MainOperators.REMAINDER:
        this.calculator.executeCommand(new RemainderCommand(lastNumber))
        this.setState({
          result: numberIsFloat(this.calculator.value)
            ? this.calculator.value.toString()
            : this.calculator.value.toFixed(3),
        })
        break

      default:
        this.calculator.executeCommand(new AddCommand(lastNumber))
        this.setState({
          result: numberIsFloat(this.calculator.value)
            ? this.calculator.value.toString()
            : this.calculator.value.toFixed(3),
        })
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
        this.setState({
          expression: String(res),
          isFinished: true,
          result: '',
          currentOperator: '',
        })
      }
    }
  }

  componentDidMount() {
    const storedHistory: string[] = localStorageGetHistory()
    this.setState({ history: storedHistory })
  }

  render() {
    const { expression, history, isError, result } = this.state
    return (
      <>
        <Wrapper>
          <Display error={isError} value={expression} result={result} />
          <Keyboard handleButton={this.handleExpressionValue} />
        </Wrapper>
        <History historyData={history} />
      </>
    )
  }
}
