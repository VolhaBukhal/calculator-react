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
  background-color: ${({ buttonType }) => (buttonType === 'number' ? '#D3D7E3' : '#787C87')};
  color: ${({ buttonType }) => (buttonType === 'number' ? 'black' : 'white')};
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
