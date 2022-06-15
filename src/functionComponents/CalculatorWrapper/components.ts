import styled from 'styled-components'

const Wrapper = styled.div`
  min-width: 420px;
  max-width: 420px;
  height: 460px;
  background-color: ${({ theme }) => theme.colors.secondaryDarkGrey};
  border-radius: 20px;
  padding: ${({ theme }) => theme.spaces[3]}px;
`

export { Wrapper }
