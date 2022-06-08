import React, { Component } from 'react'
import Button from '@common/Button'
import { KeyboardStyled, KeyboardItem } from './components'

const numbers = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '00', '.']
const rightOperands = ['/', '%', 'x', '-', '+', '=']
const leftOperands = ['(', ')', '->', '+/-', 'AC']

type KeyboardProps = {
  handleButton: (value: string) => void
}

class Keyboard extends Component<KeyboardProps> {
  render() {
    return (
      <KeyboardStyled>
        <KeyboardItem>
          {leftOperands.map((operand) => (
            <Button
              key={operand}
              value={operand}
              buttonType="operand"
              width="70"
              height="50"
              handleExpressionValue={this.props.handleButton}
            />
          ))}
        </KeyboardItem>
        <KeyboardItem width="50">
          {numbers.map((number) => (
            <Button
              key={number}
              value={number}
              buttonType="number"
              handleExpressionValue={this.props.handleButton}
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
              handleExpressionValue={this.props.handleButton}
            />
          ))}
        </KeyboardItem>
      </KeyboardStyled>
    )
  }
}

export default Keyboard
