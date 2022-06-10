import styled from 'styled-components'

const Wrapper = styled.div`
  width: 420px;
  height: 430px;
  background-color: ${({ theme }) => theme.colors.secondaryDarkGrey};
  border-radius: 20px;
  padding: ${({ theme }) => theme.spaces[3]}px;
`

export { Wrapper }
