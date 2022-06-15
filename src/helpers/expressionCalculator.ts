type CalculateArrType = Array<number | string>

function generateArrFromStr(str: string): CalculateArrType {
  const strArr = str.trim().split('')
  //str without spaces
  let nakedStr = strArr.filter((i) => i !== '' && i !== ' ')
  const lastSymbolIsOperator = /\+|\-|\/|\=|\%|x/.test(nakedStr[nakedStr.length - 1])
  nakedStr = !lastSymbolIsOperator ? nakedStr : nakedStr.splice(0, nakedStr.length - 1)

  const symbolStr = '/x+-%()'
  const calculation: CalculateArrType = []
  let current = ''

  for (let i = 0; i < nakedStr.length; i++) {
    const symbol = nakedStr[i]
    if (symbolStr.includes(symbol)) {
      if (current.length > 0) {
        calculation.push(+current)
        calculation.push(symbol)
      } else {
        calculation.push(symbol)
      }
      current = ''
    } else {
      current += symbol
    }
  }
  if (current !== '') {
    calculation.push(+current)
  }
  //check negative sign in the beginning
  if (calculation[0] === '-') {
    const temp = calculation[1] as number
    calculation[1] = temp * -1
    return calculation.splice(1, calculation.length)
  } else {
    return calculation
  }
}

//check if Brackets is paired
export function checkBrackets(calculation: CalculateArrType) {
  const stack = []
  for (const el of calculation) {
    if (el == '(') {
      stack.push(el)
    } else if (el == ')') {
      const topOfStack = stack[stack.length - 1]
      if (stack.length > 0 && topOfStack !== el) {
        stack.pop()
      } else {
        throw new Error('ExpressionError: Brackets must be paired!!!')
      }
    }
  }
  if (!stack.length) {
    return true
  } else {
    throw new Error('ExpressionError: Brackets must be paired!!!')
  }
}

function doCalc(expr: CalculateArrType) {
  let calculation = expr
  const simple: Record<string, (a: number, b: number) => number> = {
    '+': (a: number, b: number) => a + b,
    '-': (a: number, b: number) => a - b,
  }
  const complicated: Record<string, (a: number, b: number) => number> = {
    x: (a: number, b: number) => a * b,
    '/': (a: number, b: number) => a / b,
    '%': (a: number, b: number) => a % b,
  }

  // const simple: Record<string, (value: number) => void> = {
  //   '+': (value: number) => {
  //     calculator.executeCommand(new AddCommand(value))
  //   },
  //   '-': (value: number) => {
  //     calculator.executeCommand(new Subtract(value))
  //   },
  // }
  // const complicated: Record<string, (value: number) => void> = {
  //   x: (value: number) => {
  //     calculator.executeCommand(new Multiply(value))
  //   },
  //   '/': (value: number) => {
  //     calculator.executeCommand(new Divide(value))
  //   },
  //   '%': (value: number) => {
  //     calculator.executeCommand(new Remainder(value))
  //   },
  // }

  const operators = [complicated, simple]

  let newCalculation: CalculateArrType = []
  let operatorIsExist = false
  let curOperator: (a: number, b: number) => number
  curOperator = (a: number, b: number) => a + b

  // let curOperator: (value: number) => void
  // curOperator =  (value: number) => {
  //   calculator.executeCommand(new AddCommand(value))

  for (const operator of operators) {
    for (let i = 0; i < calculation.length; i++) {
      // if current el of calculation is operator then remember it for further operation else it is number - push it to newCalculation array
      const currentEl = calculation[i]
      if (operator[currentEl]) {
        curOperator = operator[currentEl]
        operatorIsExist = true
      } else if (operatorIsExist) {
        if (curOperator == operator['/'] && currentEl === 0) {
          throw new Error('TypeError: Division by zero!!!')
        } else {
          const lastNumber = newCalculation[newCalculation.length - 1]

          const curValue: number = curOperator(lastNumber as number, currentEl as number)

          newCalculation[newCalculation.length - 1] = curValue
          operatorIsExist = false
        }
      } else {
        newCalculation.push(currentEl)
      }
    }
    calculation = newCalculation
    newCalculation = []
  }
  const res = calculation[0]
  return Math.round(+res * 1000) / 1000
}

export function doCalcExpression(expr: string) {
  const calculation = generateArrFromStr(expr)

  // if brackets is paired continue
  try {
    if (calculation.includes('(') || calculation.includes(')')) {
      const bracketsIsValid = checkBrackets(calculation)
      if (bracketsIsValid) {
        //make finding the brackets and calculate the inside brackets expression while calculation length will not be equal to 1
        while (calculation.length !== 1) {
          let indexOfCloseBr: number | null = calculation.indexOf(')') // find first close bracket
          const tempArr = calculation.slice(0, indexOfCloseBr)
          let indexOfOpenBr: number | null = tempArr.lastIndexOf('(') // find last open bracket but in the array not longer then close bracket(in tempArr);
          if (indexOfCloseBr !== -1) {
            const innerCalcExp = calculation.slice(indexOfOpenBr + 1, indexOfCloseBr)
            const innerRes = doCalc(innerCalcExp)
            calculation.splice(indexOfOpenBr, indexOfCloseBr - indexOfOpenBr + 1, innerRes)
            indexOfOpenBr = null
            indexOfCloseBr = null
          } else {
            const res = doCalc(calculation)
            return Math.round(+res * 10000) / 10000
          }
        }
      }
    } else {
      const res = doCalc(calculation)
      return Math.round(+res * 10000) / 10000
    }
  } catch (err) {
    return err
  }
  return calculation[0]
}

function separateStrBySymbols(str: string) {
  const regExp = /\+|\-|\/|\)|\(|\%|x/
  return str.split(regExp)
}

export function checkCommaIsUnique(expr: string) {
  const arr = separateStrBySymbols(expr)
  const lastEl = arr[arr.length - 1]
  const isCommaAlreadyExist = lastEl.includes('.')

  return { isCommaAlreadyExist }
}

export function checkLastSignIsOperator(expr: string) {
  const operators = '+-/x%'
  const lastInExpression = expr[expr.length - 1]
  const lastSignIsOperator = operators.includes(lastInExpression)
  return { lastSignIsOperator }
}

export function checkLastSignIsOpenBrackets(expr: string) {
  const lastInExpression = expr[expr.length - 1]
  const lastSignIsOpenBracket = lastInExpression === '('
  return { lastSignIsOpenBracket }
}

export function checkLastSignIsCloseBrackets(expr: string) {
  const lastInExpression = expr[expr.length - 1]
  const lastSignIsCloseBracket = lastInExpression === ')'
  return { lastSignIsCloseBracket }
}

export function checkNumberExistAfterLastOpenBracket(expr: string) {
  const indexOfLastOpenBr = expr.lastIndexOf('(')
  const subStrFromLastOpenBr = expr.substring(indexOfLastOpenBr)
  const regExp = /[0-9]/
  const numberIsExist = regExp.test(subStrFromLastOpenBr)
  return { numberIsExist }
}

export function checkExprContainsBracket(expr: string) {
  const regExp = /\(|\)/
  return regExp.test(expr)
}

export function getLastNumberInExpr(expr: string) {
  const arr = generateArrFromStr(expr)
  const lastNumber = Number(arr[arr.length - 1])
  return { lastNumber }
}

export function generateErrorMsg(msg: string) {
  const str = msg.split(':')
  return str[str.length - 1]
}
