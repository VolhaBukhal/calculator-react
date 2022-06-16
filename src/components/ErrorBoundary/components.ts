import styled from 'styled-components'

export const ErrorWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 70vh;
`

export const Heading = styled.h4`
  font-size: ${({ theme }) => theme.fontSizes[6]}px;
  color: ${({ theme }) => theme.colors.white};
`
