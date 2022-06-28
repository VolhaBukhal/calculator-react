import { useState, useEffect } from 'react'

import { Display } from '@functionComponents/Display'
import { Keyboard } from '@functionComponents/Keyboard'
import { History } from '@functionComponents/History'

import {
  doCalcExpression,
  checkCommaIsUnique,
  checkLastSignIsOperator,
  checkLastSignIsOpenBrackets,
  checkNumberExistAfterLastOpenBracket,
  checkLastSignIsCloseBrackets,
  getLastNumberInExpr,
  generateErrorMsg,
} from '@helpers/expressionCalculator'
import {
  Calculator,
  AddCommand,
  SubtractCommand,
  MultiplyCommand,
  DivideCommand,
  RemainderCommand,
  ClearCommand,
} from '@helpers/calculator'
import { localStorageSetHistory, localStorageGetHistory } from '@helpers/localStorage'

import { Wrapper } from './components'

enum SecondaryOperators {
  CLEAR_ALL = 'AC',
  EQUAL = '=',
  COMMA = '.',
  CLEAR = '->',
  OPPOSITE_SIGN = '+/-',
  OPEN_BRACKET = '(',
  CLOSE_BRACKET = ')',
}

enum MainOperators {
  PLUS = '+',
  MINUS = '-',
  DIVIDE = '/',
  MULTIPLY = 'x',
  REMAINDER = '%',
}

const calculator = new Calculator()

export const CalculatorWrapper = () => {
  const [expression, setExpression] = useState('0')
  const [currentOperator, setCurrentOperator] = useState('')
  const [result, setResult] = useState('')
  const [history, setHistory] = useState(localStorageGetHistory() || [])
  const [isError, setIsError] = useState(false)
  const [isFinish, setIsFinish] = useState(false)

  const handleExpressionValue = (pressedBtnValue: string) => {
    switch (pressedBtnValue) {
      case SecondaryOperators.CLEAR_ALL:
        handleClearDisplay()
        break

      case SecondaryOperators.COMMA:
        handleComma(pressedBtnValue)
        break

      case SecondaryOperators.CLEAR:
        handleBackOneSign()
        break

      case SecondaryOperators.OPPOSITE_SIGN:
        handleOppositeSign()
        break

      case SecondaryOperators.OPEN_BRACKET:
        handleOpenBracket(pressedBtnValue)
        break

      case SecondaryOperators.CLOSE_BRACKET:
        handleCloseBracket(pressedBtnValue)
        break

      default:
        handleNumber(pressedBtnValue)
    }
  }

  const handleClearDisplay = () => {
    setExpression('0')
    setIsError(false)
    setIsFinish(false)
    setResult('')
    setCurrentOperator('')
  }

  const handleComma = (value: string) => {
    const { isCommaAlreadyExist } = checkCommaIsUnique(expression)
    if (!isError) {
      if (!isCommaAlreadyExist) {
        setExpression(expression + value)
      }
    }
  }

  const handleBackOneSign = () => {
    if (!isError) {
      if (expression.length > 1) {
        const cutValue = expression
          .split('')
          .splice(0, expression.length - 1)
          .join('')
        setExpression(cutValue)
      } else {
        setExpression('0')
      }
    }
  }

  const handleOppositeSign = () => {
    if (!isError) {
      if (expression.includes('-')) {
        const curValue = expression.split('').splice(1).join('')
        setExpression(curValue)
      } else {
        if (expression !== '0') {
          setExpression(`-${expression}`)
        }
      }
    }
  }

  const handleOpenBracket = (value: string) => {
    const { lastSignIsOperator } = checkLastSignIsOperator(expression)

    if (!isError) {
      if (value === '(' && lastSignIsOperator) {
        calculator.executeCommand(new ClearCommand())
        setResult('0')
        setCurrentOperator('')
      }

      if ((expression.length === 1 && expression === '0') || isFinish) {
        setIsFinish(false)
        setExpression(value)
      } else {
        const lastSign = expression.charAt(expression.length - 1)
        const { lastSignIsOperator } = checkLastSignIsOperator(expression)
        if (lastSignIsOperator) {
          setExpression(expression + value)
        } else if (lastSign === '(') {
          setExpression(expression + value)
        }
      }
    }
  }

  const handleCloseBracket = (value: string) => {
    const { lastSignIsOperator } = checkLastSignIsOperator(expression)
    const { numberIsExist } = checkNumberExistAfterLastOpenBracket(expression)
    if (
      expression.length !== 1 &&
      !lastSignIsOperator &&
      expression.includes('(') &&
      numberIsExist
    ) {
      setCurrentOperator('')
      handleImmediateResult(currentOperator)
      setExpression(expression + value)
    }
  }

  const handleNumber = (value: string) => {
    const operands = '+-/x%'
    const curValueIsOperator = operands.includes(value)
    const { lastSignIsOperator } = checkLastSignIsOperator(expression)
    const { lastSignIsOpenBracket } = checkLastSignIsOpenBrackets(expression)
    const { lastSignIsCloseBracket } = checkLastSignIsCloseBrackets(expression)
    const isDoubleZero = value === '00'
    if (curValueIsOperator) {
      setCurrentOperator(value)
    }

    if (expression === '0') {
      if (!isDoubleZero && !curValueIsOperator) {
        setExpression(value)
        setIsFinish(false)
      }
    } else {
      // sign as first
      if (isError && !curValueIsOperator) {
        setIsError(false)
        setExpression(value)
      } else if (isFinish && !curValueIsOperator) {
        if (!isDoubleZero) {
          setIsFinish(false)
          setExpression(value)
        }
      } else {
        // sign need to be added
        if (!lastSignIsOperator && !isError && !lastSignIsOpenBracket) {
          setExpression(expression + value)
          setIsFinish(false)
        } else {
          if (!curValueIsOperator) {
            if (!isDoubleZero) {
              setExpression(expression + value)
              setIsFinish(false)
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
      handleImmediateResult(currentOperator)
    }

    if (value === SecondaryOperators.EQUAL) {
      handleCalculation()
      calculator.executeCommand(new ClearCommand())
      setResult('')
      setIsFinish(true)
    }
  }

  const handleCalculation = () => {
    if (!isError) {
      setHistory([...history, expression])
    }
    const res = doCalcExpression(expression)

    if (res || res === 0) {
      if (String(res).includes('Error')) {
        const errRes = generateErrorMsg(String(res))
        setExpression(errRes)
        setIsError(true)
        setIsFinish(true)
      } else {
        setExpression(String(res))
        setIsFinish(true)
        setResult('')
        setCurrentOperator('')
      }
    }
  }

  const handleImmediateResult = (operator: string) => {
    const { lastNumber } = getLastNumberInExpr(expression)
    switch (operator) {
      case MainOperators.MINUS:
        calculator.executeCommand(new SubtractCommand(lastNumber))
        setResult(calculator.value.toString())
        break

      case MainOperators.PLUS:
        calculator.executeCommand(new AddCommand(lastNumber))
        setResult(calculator.value.toString())
        break

      case MainOperators.DIVIDE:
        calculator.executeCommand(new DivideCommand(lastNumber))
        setResult(calculator.value.toFixed(3))
        break

      case MainOperators.MULTIPLY:
        calculator.executeCommand(new MultiplyCommand(lastNumber))
        setResult(calculator.value.toString())
        break

      case MainOperators.REMAINDER:
        calculator.executeCommand(new RemainderCommand(lastNumber))
        setResult(calculator.value.toString())
        break

      default:
        calculator.executeCommand(new AddCommand(lastNumber))
        setResult(calculator.value.toString())
    }
  }

  useEffect(() => {
    return () => {
      localStorageSetHistory(history)
    }
  }, [history])

  return (
    <>
      <Wrapper>
        <Display value={expression} error={isError} result={result} />
        <Keyboard handleButton={handleExpressionValue} />
      </Wrapper>
      <History historyData={history} />
    </>
  )
}
