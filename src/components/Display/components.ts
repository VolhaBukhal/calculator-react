import styled from 'styled-components'

const DisplayStyled = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.secondaryLightGrey};
  font-size: ${({ theme }) => theme.fontSizes[6]}px;
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.black};
  padding: ${({ theme }) => theme.spaces[3]}px;
  text-align: right;
`
export { DisplayStyled }
