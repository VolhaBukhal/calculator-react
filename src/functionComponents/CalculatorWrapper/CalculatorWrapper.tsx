import { useState, useEffect } from 'react'
import { Wrapper } from './components'
import Display from '@functionComponents/Display'
import Keyboard from '@functionComponents/Keyboard/Keyboard'
import History from '@functionComponents/History'

import {
  doCalcExpression,
  checkCommaIsUnique,
  checkLastSignIsOperand,
  checkLastSignIsOpenBrackets,
  checkNumberExist,
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

const CalculatorWrapper = () => {
  const [expression, setExpression] = useState<string>('0')
  const [history, setHistory] = useState<string[]>(localStorageGetHistory() || [])
  const [isFinish, setIsFinish] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)

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
    setIsError(false)
    setIsFinish(false)
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
        const cuttedValue = expression
          .split('')
          .splice(0, expression.length - 1)
          .join('')
        setExpression(cuttedValue)
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
    if (!isError) {
      if ((expression.length === 1 && expression === '0') || isFinish) {
        setIsFinish(false)
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
  }

  const handleCloseBracket = (value: string) => {
    const { lastSignIsOperand } = checkLastSignIsOperand(expression)
    const { numberIsExist } = checkNumberExist(expression)
    if (
      expression.length !== 1 &&
      !lastSignIsOperand &&
      expression.includes('(') &&
      numberIsExist
    ) {
      setExpression(expression + value)
    }
  }

  const handleNumber = (value: string) => {
    const operands = '+-/x%'
    const curValueIsOperand = operands.includes(value)
    const { lastSignIsOperand } = checkLastSignIsOperand(expression)
    const { lastSignIsOpenBracket } = checkLastSignIsOpenBrackets(expression)
    const isDoubleZero = value === '00'
    if (expression === '0') {
      if (!isDoubleZero && !curValueIsOperand) {
        setExpression(value)
        setIsFinish(false)
      }
    } else {
      //sign as first
      if (isError && !curValueIsOperand) {
        setIsError(false)
        setExpression(value)
      } else if (isFinish && !curValueIsOperand) {
        setIsFinish(false)
        setExpression(value)
      } else {
        //sign need to be added
        if (!lastSignIsOperand && !isError && !lastSignIsOpenBracket) {
          setExpression(expression + value)
          setIsFinish(false)
        } else {
          if (!curValueIsOperand) {
            if (!isDoubleZero) {
              setExpression(expression + value)
              setIsFinish(false)
            }
          }
        }
      }
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
      }
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
        <Display value={expression} error={isError} />
        <Keyboard handleButton={handleExpressionValue} />
      </Wrapper>
      <History historyData={history} />
    </>
  )
}

export default CalculatorWrapper
