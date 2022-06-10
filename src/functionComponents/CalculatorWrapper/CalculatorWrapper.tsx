import { useState, useEffect } from 'react'
import { Wrapper } from './components'
import Display from '@functionComponents/Display'
import Keyboard from '@functionComponents/Keyboard/Keyboard'
import History from '@functionComponents/History'

import {
  doCalcExpression,
  checkCommaIsUnique,
  checkLastSignIsOperand,
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

const CalculatorWrapper = () => {
  const [expression, setExpression] = useState<string>('0')
  const [history, setHistory] = useState<string[]>(localStorageGetHistory() || [])

  const handleExpressionValue = (pressedBtnValue: string) => {
    switch (pressedBtnValue) {
      case SecondaryOperands.CLEAR_ALL:
        handleClearDisplay()
        break

      case SecondaryOperands.EQUAL:
        handleCalculation()
        break

      case SecondaryOperands.COMMA:
        handleComma(pressedBtnValue)
        break

      case SecondaryOperands.CLEAR:
        handleBackOneSign()
        break

      case SecondaryOperands.OPPOSITE_SIGN:
        handleOppositeSign()
        break

      case SecondaryOperands.OPEN_BRACKET:
        handleOpenBracket(pressedBtnValue)
        break

      case SecondaryOperands.CLOSE_BRACKET:
        handleCloseBracket(pressedBtnValue)
        break

      default:
        handleNumber(pressedBtnValue)
    }
  }

  const handleClearDisplay = () => {
    setExpression('0')
  }

  const handleComma = (value: string) => {
    const { isCommaAlreadyExist } = checkCommaIsUnique(expression)
    if (!isCommaAlreadyExist) {
      setExpression(expression + value)
    }
  }

  const handleBackOneSign = () => {
    if (expression.length > 1) {
      const cuttedValue = expression
        .split('')
        .splice(0, expression.length - 1)
        .join('')
      setExpression(cuttedValue)
    } else {
      setExpression('0')
    }
  }

  const handleOppositeSign = () => {
    if (expression.includes('-')) {
      const curValue = expression.split('').splice(1).join('')
      setExpression(curValue)
    } else {
      if (expression !== '0') {
        setExpression(`-${expression}`)
      }
    }
  }

  const handleOpenBracket = (value: string) => {
    if (expression.length === 1 && expression === '0') {
      setExpression(value)
    } else {
      const lastSign = expression.charAt(expression.length - 1)
      const { lastSignIsOperand } = checkLastSignIsOperand(expression)
      if (lastSignIsOperand) {
        setExpression(expression + value)
      } else if (lastSign === '(') {
        setExpression(expression + value)
      }
    }
  }

  const handleCloseBracket = (value: string) => {
    const { lastSignIsOperand } = checkLastSignIsOperand(expression)
    if (expression.length !== 1 && !lastSignIsOperand && expression.includes('(')) {
      setExpression(expression + value)
    }
  }

  const handleNumber = (value: string) => {
    const operands = '+-/x%'
    const isDoubleZero = value === '00'
    if (expression === '0') {
      if (!isDoubleZero && !operands.includes(value)) {
        setExpression(value)
      }
    } else {
      const { lastSignIsOperand } = checkLastSignIsOperand(expression)
      const isOperand = operands.includes(value)
      if (!lastSignIsOperand) {
        setExpression(expression + value)
      } else {
        if (!isOperand) {
          if (!isDoubleZero) {
            setExpression(expression + value)
          }
        }
      }
    }
  }

  const handleCalculation = () => {
    setHistory([...history, expression])
    const res = doCalcExpression(expression)

    if (res || res === 0) {
      setExpression(String(res))
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
        <Display value={expression} />
        <Keyboard handleButton={handleExpressionValue} />
      </Wrapper>
      <History historyData={history} />
    </>
  )
}

export default CalculatorWrapper
