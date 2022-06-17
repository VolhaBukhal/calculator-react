import styled from 'styled-components'

type ButtonTypes = {
  buttonType: string // number, operand
  width?: string
  height?: string
}

export const ButtonStyled = styled.button<ButtonTypes>`
  width: ${({ width = 50 }) => width}px;
  height: ${({ height = 70 }) => height}px;
  border: none;
  outline: none;
  border-radius: ${({ theme }) => theme.borderRadius[0]}px;
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
    border: ${({ theme }) => theme.spaces[1] / 2}px solid ${({ theme }) => theme.colors.black};
  }
  &:active {
    box-shadow: 0 ${({ theme }) => theme.spaces[1] / 2}px 3px grey;
    transform: scale(0.98);
  }
`
