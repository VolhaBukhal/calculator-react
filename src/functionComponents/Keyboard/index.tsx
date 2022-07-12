import { Button } from '@/functionComponents/Button'

import { numbers, leftOperators, rightOperators } from '@/constants/operators'
import { KeyboardProps } from './types'

import { KeyboardStyled, KeyboardItem } from './styles'

export const Keyboard = ({ handleButton }: KeyboardProps) => (
  <KeyboardStyled>
    <KeyboardItem>
      {leftOperators.map((operand) => (
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
      {rightOperators.map((operand) => (
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
