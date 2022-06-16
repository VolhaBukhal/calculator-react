import { Button } from '@/functionComponents/Button'

import { KeyboardStyled, KeyboardItem } from './components'

const numbers = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '00', '.']
const rightOperands = ['/', '%', 'x', '-', '+', '=']
const leftOperands = ['(', ')', '->', '+/-', 'AC']

type KeyboardProps = {
  handleButton: (value: string) => void
}

const Keyboard = ({ handleButton }: KeyboardProps) => (
  <KeyboardStyled>
    <KeyboardItem>
      {leftOperands.map((operand) => (
        <Button
          key={operand}
          value={operand}
          buttonType="operand"
          width="70"
          height="50"
          handleExpressionValue={handleButton}
        />
      ))}
    </KeyboardItem>
    <KeyboardItem width="50">
      {numbers.map((number) => (
        <Button
          key={number}
          value={number}
          buttonType="number"
          handleExpressionValue={handleButton}
        />
      ))}
    </KeyboardItem>
    <KeyboardItem width="30">
      {rightOperands.map((operand) => (
        <Button
          key={operand}
          value={operand}
          buttonType="operand"
          height={operand === '+' || operand === '=' ? '150' : '70'}
          handleExpressionValue={handleButton}
        />
      ))}
    </KeyboardItem>
  </KeyboardStyled>
)

export { Keyboard }
