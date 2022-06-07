import styled from 'styled-components'

const StyledLayout = styled.div`
  width: 100%;
  margin: 0 auto;
`

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 650px;
  margin: 0 auto;
  margin-top: ${({ theme }) => theme.spaces[5]}px;
`

export { StyledLayout, StyledContainer }
