import styled from 'styled-components'

const KeyboardStyled = styled.div`
  margin-top: ${({ theme }) => theme.spaces[3] - 4}px;
  height: 70%;
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spaces[3]}px;
`
type KeyboardTypes = {
  width?: string
}

const KeyboardItem = styled.div<KeyboardTypes>`
  width: ${({ width = 20 }) => width}%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-between;
`
export { KeyboardStyled, KeyboardItem }
