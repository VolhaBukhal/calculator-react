import styled from 'styled-components'

export const KeyboardStyled = styled.div`
  margin-top: ${({ theme }) => theme.spaces[3] - 4}px;
  height: ${({ theme }) => theme.widths[1]}%;
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spaces[3]}px;
`
type KeyboardTypes = {
  width?: string
}

export const KeyboardItem = styled.div<KeyboardTypes>`
  width: ${({ width = 20 }) => width}%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-between;
`
