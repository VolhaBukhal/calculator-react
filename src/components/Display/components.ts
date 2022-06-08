import styled from 'styled-components'

const DisplayStyled = styled.div`
  width: 100%;
  height: 85px;
  background-color: ${({ theme }) => theme.colors.secondaryLightGrey};
  font-size: ${({ theme }) => theme.fontSizes[6]}px;
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.black};
  padding: ${({ theme }) => theme.spaces[3]}px;
  text-align: right;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 7px;
    height: 7px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.secondaryGrey};
    border-radius: 10px;
    &:hover {
      background-color: ${({ theme }) => theme.colors.secondaryDarkGrey};
    }
  }
`

const DisplayTempRes = styled.div`
  align-self: flex-end;
  font-size: ${({ theme }) => theme.fontSizes[4]}px;
  color: ${({ theme }) => theme.colors.secondaryDarkGrey};
`
const DisplayRes = styled.div`
  color: ${({ theme }) => theme.colors.black};
`

export { DisplayStyled, DisplayTempRes, DisplayRes }
