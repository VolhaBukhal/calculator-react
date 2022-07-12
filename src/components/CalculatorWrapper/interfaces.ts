export interface CalculatorWrapperState {
  expression: string
  result: string
  currentOperator: string
  history: Array<string>
  isError: boolean
  isFinished: boolean
}
