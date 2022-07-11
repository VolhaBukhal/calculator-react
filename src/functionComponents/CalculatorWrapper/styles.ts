import styled from 'styled-components'

export const Wrapper = styled.div`
  min-width: ${({ theme }) => theme.widths[7]}px;
  max-width: ${({ theme }) => theme.widths[8]}px;
  height: ${({ theme }) => theme.widths[9]}px;
  background-color: ${({ theme }) => theme.colors.secondaryDarkGrey};
  border-radius: ${({ theme }) => theme.borderRadius[2]}px;
  padding: ${({ theme }) => theme.spaces[3]}px;
`
