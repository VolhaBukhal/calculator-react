export interface Command {
  execute(value: number): number
  undo(value: number): number
}

class Calculator {
  value: number
  history: Array<Command>
  constructor() {
    this.value = 0
    this.history = []
  }

  executeCommand(command: Command) {
    this.history.push(command)
    this.value = command.execute(this.value)
  }

  undo() {
    const command = this.history.pop()
    if (command) {
      this.value = command.undo(this.value)
    }
  }

  setValue(value: number) {
    this.value = value
  }
}

class ClearCommand implements Command {
  tempValue = 0
  execute(currentValue: number) {
    this.tempValue = currentValue
    return 0
  }
  undo() {
    return this.tempValue
  }
}

class setValueCommand implements Command {
  valueToSet: number
  tempValue: number
  constructor(valueToSet: number) {
    this.valueToSet = valueToSet
    this.tempValue = 0
  }

  execute(currentValue: number) {
    this.tempValue = currentValue
    return this.valueToSet
  }
  undo() {
    return this.tempValue
  }
}

class AddCommand implements Command {
  valueToAdd: number
  constructor(valueToAdd: number) {
    this.valueToAdd = valueToAdd
  }

  execute(currentValue: number) {
    return currentValue + this.valueToAdd
  }

  undo(currentValue: number) {
    return currentValue - this.valueToAdd
  }
}

class SubtractCommand implements Command {
  valueToSubtract: number
  constructor(valueToSubtract: number) {
    this.valueToSubtract = valueToSubtract
  }

  execute(currentValue: number) {
    return currentValue - this.valueToSubtract
  }

  undo(currentValue: number) {
    return currentValue + this.valueToSubtract
  }
}

class MultiplyCommand implements Command {
  valueToMultiply: number
  constructor(valueToMultiply: number) {
    this.valueToMultiply = valueToMultiply
  }
  execute(currentValue: number) {
    return this.valueToMultiply * currentValue
  }
  undo(currentValue: number) {
    return this.valueToMultiply / currentValue
  }
}

class DivideCommand implements Command {
  valueToDivide: number
  constructor(valueToDivide: number) {
    this.valueToDivide = valueToDivide
  }

  execute(currentValue: number) {
    return Math.round((currentValue / this.valueToDivide) * 1000) / 1000
  }
  undo(currentValue: number) {
    return this.valueToDivide * currentValue
  }
}

class RemainderCommand implements Command {
  valueToRemainder: number
  temp: number
  constructor(valueToRemainder: number) {
    this.valueToRemainder = valueToRemainder
    this.temp = 0
  }

  execute(currentValue: number) {
    this.temp = Math.floor(currentValue / this.valueToRemainder)
    return currentValue % this.valueToRemainder
  }

  undo(currentValue: number) {
    const tempVal = this.temp * this.valueToRemainder
    return currentValue + tempVal
  }
}

export {
  Calculator,
  AddCommand,
  SubtractCommand,
  MultiplyCommand,
  DivideCommand,
  RemainderCommand,
  ClearCommand,
  setValueCommand,
}
