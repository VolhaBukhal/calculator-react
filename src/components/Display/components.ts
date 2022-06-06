import styled from 'styled-components'

const DisplayStyled = styled.div`
  /* display: flex;
  justify-content: space-between; */
  width: 100%;
  background-color: ${({ theme }) => theme.colors.secondaryLightGrey};
  font-size: ${({ theme }) => theme.fontSizes[6]}px;
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.black};
  padding: ${({ theme }) => theme.spaces[3]}px;
  text-align: right;
`

const DisplayTempRes = styled.div`
  align-self: flex-end;
  font-size: ${({ theme }) => theme.fontSizes[4]}px;
  color: ${({ theme }) => theme.colors.secondaryDarkGrey};

  /* padding: ${({ theme }) => theme.spaces[3]}px;
  text-align: right; */
`
const DisplayRes = styled.div`
  color: ${({ theme }) => theme.colors.black};
`

export { DisplayStyled, DisplayTempRes, DisplayRes }
