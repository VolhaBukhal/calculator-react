import styled from 'styled-components'

type ButtonTypes = {
  buttonType: string //number, operand
  width?: string
  height?: string
}

const ButtonStyled = styled.button<ButtonTypes>`
  width: ${({ width = 50 }) => width}px;
  height: ${({ height = 70 }) => height}px;
  border: none;
  outline: none;
  border-radius: 5px;
  background-color: ${(props) =>
    props.buttonType === 'number'
      ? props.theme.colors.buttonGreyLight
      : props.theme.colors.buttonGreyDark};
  color: ${(props) =>
    props.buttonType === 'number'
      ? props.theme.colors.buttonGreyDark
      : props.theme.colors.buttonGreyLight};
  font-size: ${({ theme }) => theme.fontSizes[5]}px;
  &:hover {
    cursor: pointer;
    border: 2px solid ${({ theme }) => theme.colors.black};
  }
  &:active {
    box-shadow: 0 2px 3px grey;
    transform: scale(0.98);
  }
`

export { ButtonStyled }
