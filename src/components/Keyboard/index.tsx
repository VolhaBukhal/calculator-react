import React, { Component } from 'react'

import { Button } from '@/components/Button'

import { KeyboardProps } from './interfaces'

import { numbers, leftOperators, rightOperators } from '@/constants/operators'

import { KeyboardStyled, KeyboardItem } from './styles'

export class Keyboard extends Component<KeyboardProps> {
  render() {
    return (
      <KeyboardStyled>
        <KeyboardItem>
          {leftOperators.map((operand) => (
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
          {rightOperators.map((operand) => (
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
