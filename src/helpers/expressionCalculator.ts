//'25+3-18*5/14'
function generateArrFromStr(str: string) {
  const strArr = str.trim().split('')
  //str without spaces
  debugger
  let nakedStr = strArr.filter((i) => i !== '' && i !== ' ')
  const lastSymbolIsOperand = /\+|\-|\/|\=|\%|x/.test(nakedStr[nakedStr.length - 1])
  nakedStr = !lastSymbolIsOperand ? nakedStr : nakedStr.splice(0, nakedStr.length - 1)

  const symbolStr = '/x+-%()'
  const calculation = []
  let current = ''

  for (let i = 0; i < nakedStr.length; i++) {
    const symbol = nakedStr[i]
    if (symbolStr.includes(symbol)) {
      if (current.length > 0) {
        calculation.push(current)
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
    calculation.push(current)
  }
  //check negative sign in the beginning
  if (calculation[0] === '-') {
    const tem = Number(calculation[1])
    calculation[1] = String(tem * -1)
    return calculation.splice(1, calculation.length)
  } else {
    return calculation
  }
}

//check if Brackets is paired
function checkBrackets(calculation: Array<string>) {
  const stack = []
  for (const el of calculation) {
    if (el == '(') {
      stack.push(el)
    } else if (el == ')') {
      const topOfStack = stack[stack.length - 1]
      if (stack.length > 0 && topOfStack !== el) {
        stack.pop()
      } else {
        throw new Error('ExpressionError: Brackets must be paired')
      }
    }
  }
  if (!stack.length) {
    return true
  } else {
    throw new Error('ExpressionError: Brackets must be paired')
  }
}
function doCalc(expr: string) {
  let calculation = generateArrFromStr(expr)
  debugger

  const simple: Record<string, (a: number, b: number) => number> = {
    '+': (a: number, b: number) => a + b,
    '-': (a: number, b: number) => a - b,
  }
  const complicated: Record<string, (a: number, b: number) => number> = {
    x: (a: number, b: number) => a * b,
    '/': (a: number, b: number) => a / b,
    '%': (a: number, b: number) => a % b,
  }

  const operators = [simple, complicated]

  let newCalculation: string[] = []
  let operatorIsExist = false
  let curOperator: (a: number, b: number) => number
  curOperator = (a: number, b: number) => a + b

  for (const operator of operators) {
    for (let i = 0; i < calculation.length; i++) {
      // if current el of calculation is operator then remember it for further operation else it is number - push it to newCalculation array
      const currentEl = calculation[i]
      if (operator[currentEl]) {
        curOperator = operator[currentEl]
        operatorIsExist = true
      } else if (operatorIsExist) {
        if (curOperator == operator['/'] && currentEl === '0') {
          throw new Error('TypeError: Division by zero.')
        } else {
          const lastNumber = newCalculation[newCalculation.length - 1]
          const curValue: number = curOperator(+lastNumber, +currentEl)
          newCalculation[newCalculation.length - 1] = String(curValue)
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
  debugger
  const calculation = generateArrFromStr(expr)
  // if brackets is paired continue
  if (calculation.includes('(') || calculation.includes(')')) {
    if (checkBrackets(calculation as Array<string>)) {
      //make finding the brackets and calculate the inside brackets expression while calculation length will not be equal to 1
      while (calculation.length !== 1) {
        let indexOfCloseBr: number | null = calculation.indexOf(')') // find first close bracket
        const tempArr = calculation.slice(0, indexOfCloseBr)
        let indexOfOpenBr: number | null = tempArr.lastIndexOf('(') // find last open bracket but in the array not longer then close bracket(in tempArr);
        if (indexOfCloseBr !== -1) {
          const innerCalcExp = calculation.slice(indexOfOpenBr + 1, indexOfCloseBr)
          const innerRes = doCalc(innerCalcExp.join(''))
          calculation.splice(indexOfOpenBr, indexOfCloseBr - indexOfOpenBr + 1, String(innerRes))
          indexOfOpenBr = null
          indexOfCloseBr = null
        } else {
          const res = doCalc(calculation.join(''))
          return Math.round(+res * 10000) / 10000
        }
      }
    }
  } else {
    const res = doCalc(calculation.join(''))
    return Math.round(+res * 10000) / 10000
  }
}

// Do not use eval!!!
export function expressionCalculator(expr: string) {
  //transform expression to array
  debugger
  const strArr = expr.trim().split('')
  //str without spaces
  const nakedStr = strArr.filter((i) => i !== '' && i !== ' ')
  const symbolStr = '/*+-()'
  const calculation = []
  let current = ''
  for (let i = 0; i < nakedStr.length; i++) {
    const symbol = nakedStr[i]
    if (symbolStr.indexOf(symbol) !== -1) {
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

  //check brackets in array
  function checkBrackets(calculation: Array<string>) {
    const stack = []
    for (const el of calculation) {
      if (el == '(') {
        stack.push(el)
      } else if (el == ')') {
        const topOfStack = stack[stack.length - 1]
        if (stack.length > 0 && topOfStack !== el) {
          stack.pop()
        } else {
          throw new Error('ExpressionError: Brackets must be paired')
        }
      }
    }
    if (!stack.length) {
      return true
    } else {
      throw new Error('ExpressionError: Brackets must be paired')
    }
  }

  //make calculation starting from more priority operand
  const doCalc = (calculation: string[]): string[] => {
    const simple: Record<string, (a: number, b: number) => number> = {
      '+': (a: number, b: number) => a + b,
      '-': (a: number, b: number) => a - b,
    }
    const complicated: Record<string, (a: number, b: number) => number> = {
      '*': (a: number, b: number) => a * b,
      '/': (a: number, b: number) => a / b,
    }

    const operators = [simple, complicated]

    let newCalculation: string[] = []
    let curOperator: (a: number, b: number) => number

    for (const operator of operators) {
      for (let i = 0; i < calculation.length; i++) {
        // if current el of calculation is operator then remember it for further operation else it is number - push it to newCalculation array
        const currentEl = calculation[i]
        if (operator[currentEl]) {
          curOperator = operator[currentEl]
          if (curOperator == operator['/'] && currentEl === '0') {
            throw new Error('TypeError: Division by zero.')
          } else {
            const lastNumber: string = newCalculation[newCalculation.length - 1]
            const curValue = curOperator(Number(lastNumber), Number(currentEl))
            newCalculation[newCalculation.length - 1] = String(curValue)
          }
        } else {
          newCalculation.push(currentEl)
        }
      }
      calculation = newCalculation
      newCalculation = []
    }
    return calculation
  }

  // if brackets is paired continue
  if (calculation.includes('(') || calculation.includes(')')) {
    if (checkBrackets(calculation as Array<string>)) {
      //make finding the brackets and calculate the inside brackets expression while calculation length will not be equal to 1
      while (calculation.length !== 1) {
        let indexOfCloseBr: number | null = calculation.indexOf(')') // find first close bracket
        const tempArr = calculation.slice(0, indexOfCloseBr)
        let indexOfOpenBr: number | null = tempArr.lastIndexOf('(') // find last open bracket but in the array not longer then close bracket(in tempArr);
        if (indexOfCloseBr !== -1) {
          const innerCalcExp = calculation.slice(indexOfOpenBr + 1, indexOfCloseBr)
          const innerRes = doCalc(innerCalcExp as string[])
          calculation.splice(indexOfOpenBr, indexOfCloseBr - indexOfOpenBr + 1, innerRes[0])
          indexOfOpenBr = null
          indexOfCloseBr = null
        } else {
          const res = doCalc(calculation as string[])
          return Math.round(+res * 10000) / 10000
        }
      }
    }
  } else {
    const res = doCalc(calculation as string[])
    return Math.round(+res * 10000) / 10000
  }
}

export default { doCalc, expressionCalculator, doCalcExpression }
